"use client";

import { signOut } from "next-auth/react";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription } from "@/components";
import { AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, Button, toast } from "@/components";
import { loginUrl } from "@/constants";

export default function Logout() {
   async function onLogout() {
      await signOut({ callbackUrl: loginUrl });
      toast({ title: "User logged out successfully" });
   }

   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <Button type="button" variant="secondary" className="w-36 text-destructive">
               Logout
            </Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
               <AlertDialogDescription>
                  Take a minute and rethink if you are sure to logout of your account.
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={onLogout}>Logout</AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
}
