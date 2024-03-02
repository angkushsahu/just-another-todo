import type { Metadata } from "next";

import ForgotPasswordForm from "./form";

export const metadata: Metadata = {
   title: "Forgot Password",
};

export default function ForgotPasswordPage() {
   return (
      <main className="container flex min-h-page items-center justify-center py-10">
         <section className="w-full max-w-lg">
            <h1 className="mb-6 text-3xl font-medium">Forgot Password</h1>
            <ForgotPasswordForm />
         </section>
      </main>
   );
}
