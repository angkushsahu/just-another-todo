"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, toast } from "@/components";
import { type UserRegisterType, userRegisterSchema } from "@/validation";
import { loginUrl, todoUrl } from "@/constants";
import { api } from "@/trpc/react";

export default function RegisterForm() {
   const searchParams = useSearchParams();
   const callbackUrl = searchParams.get("callbackUrl");

   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const registerForm = useForm<UserRegisterType>({
      resolver: zodResolver(userRegisterSchema),
      defaultValues: { confirmPassword: "", email: "", name: "", password: "" },
   });

   const { mutate: registerUser, isLoading } = api.auth.register.useMutation({
      async onSuccess(data) {
         await signIn("credentials", { userId: data.user.id, callbackUrl: callbackUrl ?? todoUrl });
         toast({ title: data.message });
         registerForm.reset();
      },
      onError(error) {
         toast({ variant: "destructive", title: error.message });
      },
   });

   function onRegister(values: UserRegisterType) {
      if (isLoading) return;
      registerUser(values);
   }

   return (
      <>
         <Form {...registerForm}>
            <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-6">
               <FormField
                  control={registerForm.control}
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
                  control={registerForm.control}
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
               <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Enter a strong password</FormLabel>
                        <div className="relative isolate">
                           <FormControl>
                              <Input
                                 placeholder="Enter a strong password"
                                 {...field}
                                 type={showPassword ? "text" : "password"}
                                 className="pr-10"
                              />
                           </FormControl>
                           <span
                              className="absolute left-auto right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                              onClick={() => setShowPassword((prev) => !prev)}
                           >
                              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                           </span>
                        </div>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={registerForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Confirm password</FormLabel>
                        <div className="relative isolate">
                           <FormControl>
                              <Input
                                 placeholder="Confirm password"
                                 {...field}
                                 type={showConfirmPassword ? "text" : "password"}
                                 className="pr-10"
                              />
                           </FormControl>
                           <span
                              className="absolute left-auto right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                              onClick={() => setShowConfirmPassword((prev) => !prev)}
                           >
                              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                           </span>
                        </div>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <Button type="submit" className="w-full" disabled={isLoading}>
                  Register
               </Button>
            </form>
         </Form>
         <div className="mt-4 text-center text-sm text-muted-foreground">
            <Link href={loginUrl}>Login instead</Link>
         </div>
      </>
   );
}
