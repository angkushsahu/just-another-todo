import { RedirectType, redirect } from "next/navigation";
import type { Metadata } from "next";

import { getServerAuthSession } from "@/server/auth";
import ResetPasswordForm from "./form";
import { todoUrl } from "@/constants";
import { parseSlug } from "@/lib";

export const metadata: Metadata = {
   title: "Reset Password",
};

export default async function ResetPasswordPage({ params }: { params: unknown }) {
   const session = await getServerAuthSession();
   if (session?.user) redirect(todoUrl, RedirectType.replace);

   const slug = parseSlug(params);

   return (
      <main className="container flex min-h-page items-center justify-center py-10">
         <section className="w-full max-w-lg">
            <h1 className="mb-6 text-3xl font-medium">Reset Password</h1>
            <ResetPasswordForm resetId={slug} />
         </section>
      </main>
   );
}
