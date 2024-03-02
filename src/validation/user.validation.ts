import { z } from "zod";
import { resetPasswordSchema } from "./auth.validation";

export const updateUserSchema = z.object({
   name: z.string().min(1, { message: "Required field" }),
   email: z.string().min(1, { message: "Required field" }).email({ message: "Please enter a valid e-mail" }),
});

export const updatePasswordSchema = resetPasswordSchema;

export type UpdateUserType = z.infer<typeof updateUserSchema>;
export type UpdatePasswordType = z.infer<typeof updatePasswordSchema>;
