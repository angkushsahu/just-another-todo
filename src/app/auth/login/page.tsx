import { RedirectType, redirect } from "next/navigation";
import type { Metadata } from "next";

import { getServerAuthSession } from "@/server/auth";
import { todoUrl } from "@/constants";
import LoginForm from "./form";

export const metadata: Metadata = {
   title: "Login",
};

export default async function LoginPage() {
   const session = await getServerAuthSession();
   if (session?.user) redirect(todoUrl, RedirectType.replace);

   return (
      <main className="container flex min-h-page items-center justify-center py-10">
         <section className="w-full max-w-lg">
            <h1 className="mb-6 text-4xl font-medium">Login</h1>
            <LoginForm />
         </section>
      </main>
   );
}
