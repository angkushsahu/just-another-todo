import { RedirectType, redirect } from "next/navigation";
import type { Metadata } from "next";

import { getServerAuthSession } from "@/server/auth";
import ForgotPasswordForm from "./form";
import { todoUrl } from "@/constants";

export const metadata: Metadata = {
   title: "Forgot Password",
};

export default async function ForgotPasswordPage() {
   const session = await getServerAuthSession();
   if (session?.user) redirect(todoUrl, RedirectType.replace);

   return (
      <main className="container flex min-h-page items-center justify-center py-10">
         <section className="w-full max-w-lg">
            <h1 className="mb-6 text-3xl font-medium">Forgot Password</h1>
            <ForgotPasswordForm />
         </section>
      </main>
   );
}
