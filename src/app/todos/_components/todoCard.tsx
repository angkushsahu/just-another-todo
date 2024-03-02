"use client";

import { AlertTriangle } from "lucide-react";

import { Checkbox, Label, toast } from "@/components";
import type { TodoReturn } from "@/models";
import { api } from "@/trpc/react";
import DeleteTodo from "./deleteTodo";
import UpdateTodo from "./updateTodo";

export default function TodoCard(todo: TodoReturn) {
   const utils = api.useUtils();

   const { mutate: completeTodo, isLoading } = api.todo.updateCompletionStatus.useMutation({
      async onSuccess(data) {
         await utils.todo.getAllTodos.invalidate();
         await utils.todo.getTodo.invalidate({ todoId: todo.id });
         toast({ title: data.message });
      },
      onError(error: { message: string }) {
         toast({ variant: "destructive", title: error.message });
      },
   });

   async function updateChecked() {
      if (isLoading) return;
      completeTodo({ todoId: todo.id, completed: !todo.completed });
   }

   return (
      <article className="flex flex-col justify-between border-2 bg-muted/60 px-5 py-8 dark:bg-muted/10 sm:p-10">
         <div className="flex flex-col">
            {todo.priority ? (
               <div className="mb-4 flex items-center gap-x-3 text-primary">
                  <AlertTriangle className="size-5" />
                  <p className="text-lg font-semibold tracking-widest">PRIORITY</p>
               </div>
            ) : null}
            <div className="flex items-center gap-x-3">
               <Checkbox
                  id={`completed-id-${String(todo.id)}`}
                  className="size-5"
                  checked={todo.completed}
                  onCheckedChange={updateChecked}
                  disabled={isLoading}
               />
               <Label htmlFor={`completed-id-${String(todo.id)}`} className="cursor-pointer">
                  COMPLETED
               </Label>
            </div>
            <h3 className="my-3 mt-6 text-xl font-medium">{todo.title}</h3>
            {todo.description ? <p className="text-muted-foreground">{todo.description}</p> : null}
         </div>
         <div className="mt-5 flex items-center justify-end gap-x-4">
            <DeleteTodo id={String(todo.id)} />
            <UpdateTodo id={String(todo.id)} />
         </div>
      </article>
   );
}
