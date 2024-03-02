import { TRPCError } from "@trpc/server";
import type { FilterQuery } from "mongoose";

import { type ITodo, Todo } from "@/models";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { completionStatusSchema, deleteTodoSchema, findAllQuerySchema } from "@/validation";
import { getTodoSchema, todoFormSchema, updateTodoSchema } from "@/validation";

export const todoRouter = createTRPCRouter({
   createTodo: protectedProcedure.input(todoFormSchema).mutation(async ({ ctx, input }) => {
      try {
         const newTodo = await Todo.create({ ...input, userId: String(ctx.user.id) });
         if (!newTodo) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Unable to create todo" });
         const todo = newTodo.returnTodo();
         return { todo, message: "Todo created successfully" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   updateTodo: protectedProcedure.input(updateTodoSchema).mutation(async ({ ctx, input }) => {
      try {
         const todo = await Todo.findById(input.todoId);
         if (!todo) throw new TRPCError({ code: "NOT_FOUND", message: "Todo not found" });
         if (todo.userId.toHexString() !== ctx.user.id) throw new TRPCError({ code: "NOT_FOUND", message: "Todo not found" });

         todo.title = input.title;
         todo.description = input.description;
         todo.priority = input.priority;
         await todo.save();

         const updatedTodo = todo.returnTodo();
         return { todo: updatedTodo, message: "Todo updated successfully" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   updateCompletionStatus: protectedProcedure.input(completionStatusSchema).mutation(async ({ ctx, input }) => {
      try {
         const todo = await Todo.findById(input.todoId);
         if (!todo) throw new TRPCError({ code: "NOT_FOUND", message: "Todo not found" });
         if (todo.userId.toHexString() !== ctx.user.id) throw new TRPCError({ code: "NOT_FOUND", message: "Todo not found" });

         todo.completed = input.completed;
         await todo.save();

         const updatedTodo = todo.returnTodo();
         return { todo: updatedTodo, message: "Todo updated successfully" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   getTodo: protectedProcedure.input(getTodoSchema).query(async ({ ctx, input }) => {
      try {
         const todo = await Todo.findById(input.todoId);
         if (!todo) throw new TRPCError({ code: "NOT_FOUND", message: "Todo not found" });
         if (todo.userId.toHexString() !== ctx.user.id) throw new TRPCError({ code: "NOT_FOUND", message: "Todo not found" });

         const foundTodo = todo.returnTodo();
         return { todo: foundTodo, message: "Todo fetched successfully" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   deleteTodo: protectedProcedure.input(deleteTodoSchema).mutation(async ({ ctx, input }) => {
      try {
         const todo = await Todo.findById(input.todoId);
         if (!todo) throw new TRPCError({ code: "NOT_FOUND", message: "Todo not found" });
         if (todo.userId.toHexString() !== ctx.user.id) throw new TRPCError({ code: "NOT_FOUND", message: "Todo not found" });

         await todo.deleteOne();
         return { message: "Todo deleted successfully" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   getAllTodos: protectedProcedure.input(findAllQuerySchema).query(async ({ ctx, input }) => {
      try {
         const regexQueryPattern = new RegExp(input.search, "i");
         const resultsPerPage = input.limit ?? 10;

         const filterObject: FilterQuery<ITodo> = {};
         filterObject.userId = String(ctx.user.id); // Ensuring that only those todos are returned which are created by the user

         if (input.search) filterObject.title = regexQueryPattern;

         if (input.priority === "priority") filterObject.priority = true;
         else if (input.priority === "regular") filterObject.priority = false;

         if (input.completed === "done") filterObject.completed = true;
         else if (input.completed === "not-done") filterObject.completed = false;

         const dbTodos = await Todo.find(filterObject)
            .sort({ completed: 1, priority: -1 })
            .skip(resultsPerPage * ((input.cursor ?? 1) - 1))
            .limit(resultsPerPage);
         if (!dbTodos) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Unable to fetch your todos" });

         const todos = dbTodos.map((todo) => todo.returnTodo()); // getting the perfect todo object to show in the frontend
         const totalTodos = await Todo.countDocuments(filterObject);
         const totalPages = Math.ceil(totalTodos / resultsPerPage);

         return { todos, totalPages, message: "Todos fetched successfully" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),
});
