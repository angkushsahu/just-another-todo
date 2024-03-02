import { env } from "@/env";
import { connect, connections, set } from "mongoose";

export async function connectDB() {
   if (connections?.[0]?.readyState) return;

   try {
      set("strictQuery", true);
      await connect(env.DATABASE_URI);
   } catch (_err: unknown) {
      throw new Error("Unable to connect to database");
   }
}
