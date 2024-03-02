import { TRPCError } from "@trpc/server";

import { Todo } from "@/models";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { updatePasswordSchema, updateUserSchema } from "@/validation";

export const userRouter = createTRPCRouter({
   getUser: protectedProcedure.query(async ({ ctx }) => {
      const user = ctx.user.returnUser();
      return { user, message: "User found successfully" };
   }),

   updateAccount: protectedProcedure.input(updateUserSchema).mutation(async ({ ctx, input }) => {
      try {
         ctx.user.name = input.name;
         ctx.user.email = input.email;
         await ctx.user.save();

         const user = ctx.user.returnUser();
         return { user, message: "Account updated successfully" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   changePassword: protectedProcedure.input(updatePasswordSchema).mutation(async ({ ctx, input }) => {
      try {
         ctx.user.password = input.password;
         await ctx.user.save();

         const user = ctx.user.returnUser();
         return { user, message: "Password updated successfully" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),

   deleteAccount: protectedProcedure.mutation(async ({ ctx }) => {
      try {
         await Todo.deleteMany({ userId: String(ctx.user.id) });
         await ctx.user.deleteOne();
         return { message: "Account removed successfully" };
      } catch (err: unknown) {
         if (err instanceof Error) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: err.message });
         throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" });
      }
   }),
});
