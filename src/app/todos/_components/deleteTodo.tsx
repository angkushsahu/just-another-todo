"use client";

import { Trash } from "lucide-react";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription } from "@/components";
import { AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, toast } from "@/components";
import { api } from "@/trpc/react";

export default function DeleteTodo({ id }: { id: string }) {
   const utils = api.useUtils();

   const { mutate: deleteTodo, isLoading } = api.todo.deleteTodo.useMutation({
      async onSuccess(data) {
         await utils.todo.getAllTodos.invalidate();
         toast({ title: data.message });
      },
      onError(error) {
         toast({ variant: "destructive", title: error.message });
      },
   });

   function onTodoDeletion() {
      if (isLoading) return;
      deleteTodo({ todoId: id });
   }

   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <Button type="button" variant="outline" size="icon" className="rounded-full" disabled={isLoading}>
               <Trash className="size-4" />
            </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
               <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this todo from our servers.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={onTodoDeletion} disabled={isLoading}>
                  Delete Todo
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
