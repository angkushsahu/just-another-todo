"use client";

import { Pencil } from "lucide-react";

import { Button } from "@/components";
import { api } from "@/trpc/react";
import TodoForm from "./todoForm";

export default function UpdateTodo({ id }: { id: string }) {
   const { data, error, isError, isLoading } = api.todo.getTodo.useQuery({ todoId: id });
   if (isError) throw new Error(error.message);
   if (!data || isLoading) return null; // TODO: Return a meaningful loading state

   return (
      <TodoForm case="Update" {...data.todo}>
         <Button type="button" variant="outline" size="icon" className="rounded-full">
            <Pencil className="size-4" />
         </Button>
      </TodoForm>
   );
}
