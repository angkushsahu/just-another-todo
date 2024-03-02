import { authRouter, todoRouter, userRouter } from "@/server/api/routers";
import { createTRPCRouter } from "@/server/api/trpc";

export const appRouter = createTRPCRouter({
   auth: authRouter,
   user: userRouter,
   todo: todoRouter,
});

export type AppRouter = typeof appRouter;
