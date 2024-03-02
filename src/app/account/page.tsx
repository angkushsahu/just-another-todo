import type { Metadata } from "next";

import DeleteAccount from "./_components/deleteAccount";
import Logout from "./_components/logout";
import Profile from "./_components/profile";
import QuickLinks from "./_components/quickLinks";

export const metadata: Metadata = {
   title: "Your Account",
};

export default function LoginPage() {
   return (
      <main className="container space-y-12 py-10">
         <Profile />
         <QuickLinks />
         <section className="flex flex-col items-end gap-y-4">
            <h1 className="mb-2 text-3xl font-medium">Danger Zone</h1>
            <Logout />
            <DeleteAccount />
         </section>
      </main>
   );
}
