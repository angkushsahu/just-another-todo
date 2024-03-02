import type { Metadata } from "next";

import GetUserDetails from "./_components/getUserDetails";

export const metadata: Metadata = {
   title: "Update Account",
};

export default function UpdateAccountPage() {
   return (
      <main className="container flex min-h-page items-center justify-center py-10">
         <section className="w-full max-w-lg">
            <h1 className="mb-6 text-3xl font-medium">Update Account</h1>
            <GetUserDetails />
         </section>
      </main>
   );
}
