import { ListChecks, ShieldAlert, SquareUser } from "lucide-react";
import Link from "next/link";

import { changePasswordUrl, todoUrl, updateAccountUrl } from "@/constants";

const quickLinks = [
   {
      Icon: ListChecks,
      title: "Your Todos",
      description: "See all your todos here",
      path: todoUrl,
   },
   {
      Icon: SquareUser,
      title: "Update Account",
      description: "Update your name and e-mail address here",
      path: updateAccountUrl,
   },
   {
      Icon: ShieldAlert,
      title: "Change Password",
      description: "Update your password if necessary here",
      path: changePasswordUrl,
   },
];

export default function QuickLinks() {
   return (
      <section>
         <h1 className="mb-6 text-3xl font-medium">Quick Links</h1>
         <div className="grid gap-5 sm:grid-cols-[repeat(auto-fit,minmax(22rem,1fr))]">
            {quickLinks.map((quickLink) => (
               <Link href={quickLink.path} key={quickLink.title} className="rounded-md bg-muted p-5 shadow-md">
                  <article>
                     <div className="mb-2 flex items-center gap-x-4">
                        <quickLink.Icon className="size-6 text-muted-foreground" />
                        <p className="text-lg font-semibold">{quickLink.title}</p>
                     </div>
                     <p className="text-muted-foreground">{quickLink.description}</p>
                  </article>
               </Link>
            ))}
         </div>
      </section>
   );
}
