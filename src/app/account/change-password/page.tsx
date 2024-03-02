import type { Metadata } from "next";

import ChangePasswordForm from "./form";

export const metadata: Metadata = {
   title: "Change Password",
};

export default function ChangePasswordPage() {
   return (
      <main className="container flex min-h-page items-center justify-center py-10">
         <section className="w-full max-w-lg">
            <h1 className="mb-6 text-3xl font-medium">Change Password</h1>
            <ChangePasswordForm />
         </section>
      </main>
   );
}
