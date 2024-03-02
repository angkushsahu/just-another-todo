import { TRPCError, initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { connectDB } from "@/database";
import { User } from "@/models";
import { getServerAuthSession } from "@/server/auth";

export const createTRPCContext = async (opts: { headers: Headers }) => {
   const session = await getServerAuthSession();
   await connectDB();
   return { session, ...opts };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
   transformer: superjson,
   errorFormatter({ shape, error }) {
      return {
         ...shape,
         data: {
            ...shape.data,
            zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
         },
      };
   },
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
   if (!ctx.session?.user) throw new TRPCError({ code: "UNAUTHORIZED" });

   const user = await User.findById(ctx.session.user.userId);
   if (!user) throw new TRPCError({ code: "UNAUTHORIZED", message: "Login to access this resource" });

   return next({
      ctx: {
         session: { ...ctx.session, user: ctx.session.user },
         user,
      },
   });
});
