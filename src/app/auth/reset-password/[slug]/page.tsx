import type { Metadata } from "next";

import { parseSlug } from "@/lib";
import ResetPasswordForm from "./form";

export const metadata: Metadata = {
   title: "Reset Password",
};

export default function ResetPasswordPage({ params }: { params: unknown }) {
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
