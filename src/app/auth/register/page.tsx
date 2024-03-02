import type { Metadata } from "next";

import RegisterForm from "./form";

export const metadata: Metadata = {
   title: "Register",
};

export default function RegisterPage() {
   return (
      <main className="container flex min-h-page items-center justify-center py-10">
         <section className="w-full max-w-lg">
            <h1 className="mb-6 text-4xl font-medium">Register</h1>
            <RegisterForm />
         </section>
      </main>
   );
}
