"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Textarea } from "@/components";
import { Button, Checkbox, DialogFooter, DialogHeader, DialogTitle, toast } from "@/components";
import { api } from "@/trpc/react";
import { type TodoFormType, todoFormSchema } from "@/validation";
import type { TodoEditFormProps } from "./types";

export default function TodoEditForm(props: TodoEditFormProps) {
   const formTitle = `${props.case} Todo`;
   const utils = api.useUtils();

   const defaultValues: TodoFormType =
      props.case === "Create"
         ? { description: "", priority: false, title: "" }
         : { description: props.description, priority: props.priority, title: props.title };

   const todoForm = useForm<TodoFormType>({
      resolver: zodResolver(todoFormSchema),
      defaultValues,
   });

   async function onSuccess(data: { message: string }) {
      if (props.case === "Create") todoForm.reset();

      await utils.todo.getAllTodos.invalidate();
      if (props.case === "Update") await utils.todo.getTodo.invalidate({ todoId: props.id });

      toast({ title: data.message });
   }
   function onError(error: { message: string }) {
      toast({ variant: "destructive", title: error.message });
   }

   const { mutate: createTodo, isLoading: isCreationLoading } = api.todo.createTodo.useMutation({ onSuccess, onError });
   const { mutate: updateTodo, isLoading: isUpdationLoading } = api.todo.updateTodo.useMutation({ onSuccess, onError });
   const isLoading = isCreationLoading || isUpdationLoading;

   function onSubmit(values: TodoFormType) {
      if (isLoading) return;
      if (props.case === "Create") createTodo(values);
      else updateTodo({ ...values, todoId: props.id });
   }

   return (
      <Form {...todoForm}>
         <form onSubmit={todoForm.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
               <DialogTitle>{formTitle}</DialogTitle>
            </DialogHeader>
            <FormField
               control={todoForm.control}
               name="title"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Title</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. Buy banana" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={todoForm.control}
               name="description"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Description</FormLabel>
                     <FormControl>
                        <Textarea placeholder="e.g. Buy banana for my monkey ...." {...field} className="h-28 resize-none" />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={todoForm.control}
               name="priority"
               render={({ field }) => (
                  <FormItem>
                     <div className="flex items-center gap-x-3">
                        <FormControl>
                           <Checkbox checked={field.value} onCheckedChange={field.onChange} className="size-5" />
                        </FormControl>
                        <FormLabel className="cursor-pointer text-lg">Priority</FormLabel>
                     </div>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <DialogFooter>
               <Button type="submit" disabled={isLoading}>
                  {formTitle}
               </Button>
            </DialogFooter>
         </form>
      </Form>
   );
}
