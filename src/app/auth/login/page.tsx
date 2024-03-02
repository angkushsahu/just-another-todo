import type { Metadata } from "next";

import LoginForm from "./form";

export const metadata: Metadata = {
   title: "Login",
};

export default function LoginPage() {
   return (
      <main className="container flex min-h-page items-center justify-center py-10">
         <section className="w-full max-w-lg">
            <h1 className="mb-6 text-4xl font-medium">Login</h1>
            <LoginForm />
         </section>
      </main>
   );
}
