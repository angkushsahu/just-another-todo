import { createHash, randomBytes } from "crypto";
import { TRPCError } from "@trpc/server";
import { compare } from "bcrypt";

import { sendResetEmail } from "@/lib/sendResetMail";
import { User } from "@/models";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { forgotPasswordTrpcSchema, loginSchema, resetPasswordTrpcSchema, userRegisterSchema } from "@/validation";

export const authRouter = createTRPCRouter({
   register: publicProcedure.input(userRegisterSchema).mutation(async ({ input }) => {
      try {
         const userAlreadyExists = await User.findOne({ email: input.email });
         if (userAlreadyExists) throw new TRPCError({ code: "CONFLICT", message: "E-mail already exists, login instead" });

         const { confirmPassword: _, ...inputValues } = input;
         const newUser = await User.create(inputValues);
         if (!newUser) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Unable to create user" });

         const user = newUser.returnUser();
         return { user, message: "User register successful" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   login: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
      try {
         const foundUser = await User.findOne({ email: input.email });
         if (!foundUser) throw new TRPCError({ code: "NOT_FOUND", message: "E-mail not registered, signup instead" });

         const arePasswordsSame = await compare(input.password, foundUser.password);
         if (!arePasswordsSame) throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid credentials" });

         const user = foundUser.returnUser();
         return { user, message: "User login successful" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   forgotPassword: publicProcedure.input(forgotPasswordTrpcSchema).mutation(async ({ input }) => {
      try {
         const user = await User.findOne({ email: input.email });
         if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "E-mail not registered, signup instead" });

         const resetToken = randomBytes(16).toString("hex");
         user.resetPassword = createHash("sha256").update(resetToken).digest("hex");
         const mailResponse = await sendResetEmail({ email: input.email, resetToken, origin: input.originUrl });
         if (!mailResponse.success) throw new TRPCError({ message: mailResponse.message, code: "INTERNAL_SERVER_ERROR" });

         await user.save();
         return { message: mailResponse.message };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   resetPassword: publicProcedure.input(resetPasswordTrpcSchema).mutation(async ({ input }) => {
      try {
         const resetPassword = createHash("sha256").update(input.resetId).digest("hex");
         const user = await User.findOne({ resetPassword });
         if (!user) throw new TRPCError({ message: "User not found", code: "NOT_FOUND" });

         user.password = input.password;
         user.resetPassword = "";
         await user.save();
         return { message: "Password updated successfully, login with new credentials" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),
});
