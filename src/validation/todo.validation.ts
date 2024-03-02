import { z } from "zod";

export const todoFormSchema = z.object({
   title: z.string().min(1, { message: "Required field" }),
   description: z.string(),
   priority: z.boolean(),
});

export const deleteTodoSchema = z.object({
   todoId: z.string().min(1),
});

export const getTodoSchema = deleteTodoSchema;

export const updateTodoSchema = z.intersection(todoFormSchema, deleteTodoSchema);

export const completionStatusSchema = z.intersection(
   deleteTodoSchema,
   z.object({
      completed: z.boolean().default(false),
   })
);

export const findAllQuerySchema = z.object({
   search: z.string().default(""),
   priority: z.enum(["all", "priority", "regular"]).default("all"),
   completed: z.enum(["all", "done", "not-done"]).default("all"),
   page: z.number().default(1),
   limit: z.number().min(1).max(100).nullish(),
   cursor: z.number().nullish(),
});

export type TodoFormType = z.infer<typeof todoFormSchema>;
