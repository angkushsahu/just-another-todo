import { z } from "zod";

export const userRegisterSchema = z
   .object({
      name: z.string().min(1, { message: "Required field" }),
      email: z.string().min(1, { message: "Required field" }).email({ message: "Please enter a valid e-mail" }),
      password: z.string().min(1, { message: "Required field" }),
      confirmPassword: z.string().min(1, { message: "Required field" }),
   })
   .refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "Passwords do not match" });

export const loginSchema = z.object({
   email: z.string().min(1, { message: "Required field" }).email({ message: "Please enter a valid e-mail" }),
   password: z.string().min(1, { message: "Required field" }),
});

export const forgotPasswordSchema = z.object({
   email: z.string().min(1, { message: "Required field" }).email({ message: "Please enter a valid e-mail" }),
});

export const forgotPasswordTrpcSchema = z.intersection(forgotPasswordSchema, z.object({ originUrl: z.string() }));

export const resetPasswordSchema = z
   .object({
      password: z.string().min(1, { message: "Required field" }),
      confirmPassword: z.string().min(1, { message: "Required field" }),
   })
   .refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "Passwords do not match" });

export const resetPasswordTrpcSchema = z.intersection(resetPasswordSchema, z.object({ resetId: z.string() }));

export type LoginType = z.infer<typeof loginSchema>;
export type UserRegisterType = z.infer<typeof userRegisterSchema>;
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;
