"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, toast } from "@/components";
import { api } from "@/trpc/react";
import { type UpdateUserType, updateUserSchema } from "@/validation";

export interface UpdateAccountFormProps {
   email: string;
   name: string;
}

export default function UpdateAccountForm({ email, name }: UpdateAccountFormProps) {
   const updateUserForm = useForm<UpdateUserType>({
      resolver: zodResolver(updateUserSchema),
      defaultValues: { email, name },
   });

   const { mutate: updateUser, isLoading } = api.user.updateAccount.useMutation({
      onSuccess(data) {
         toast({ title: data.message });
      },
      onError(error) {
         toast({ variant: "destructive", title: error.message });
      },
   });

   function onAccountUpdate(values: UpdateUserType) {
      if (isLoading) return;
      updateUser(values);
   }

   return (
      <Form {...updateUserForm}>
         <form onSubmit={updateUserForm.handleSubmit(onAccountUpdate)} className="space-y-6">
            <FormField
               control={updateUserForm.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>User Name</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. John Doe" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={updateUserForm.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>User E-mail</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. johndoe@gmail.com" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
               Update
            </Button>
         </form>
      </Form>
   );
}
