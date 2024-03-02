"use client";

import { signOut } from "next-auth/react";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription } from "@/components";
import { AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, toast } from "@/components";
import { api } from "@/trpc/react";

export default function DeleteAccount() {
   const { mutate: deleteAccount, isLoading } = api.user.deleteAccount.useMutation({
      async onSuccess(data) {
         await signOut();
         toast({ title: data.message });
      },
      onError(error) {
         toast({ variant: "destructive", title: error.message });
      },
   });

   function onAccountDelete() {
      if (isLoading) return;
      deleteAccount();
   }

   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <Button type="button" variant="destructive" className="w-36" disabled={isLoading}>
               Delete Account
            </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
               <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove all your data from our
                  servers.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={onAccountDelete} disabled={isLoading}>
                  Delete My Account
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
