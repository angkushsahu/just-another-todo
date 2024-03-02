"use client";

import { api } from "@/trpc/react";

export default function Profile() {
   const { data, error, isError } = api.user.getUser.useQuery();
   if (isError) throw new Error(error.message);

   return (
      <section>
         <h1 className="mb-6 text-3xl font-medium">Your Account</h1>
         <table className="block">
            <tbody className="block divide-y-2 divide-muted border-2 border-muted md:divide-y-0">
               <tr className="flex flex-col md:flex-row">
                  <td className="border-muted bg-muted p-3 font-semibold dark:bg-muted/40 md:w-56 md:border-r-2 md:bg-transparent dark:md:bg-transparent lg:w-96">
                     Name
                  </td>
                  <td className="w-full p-3 md:pl-4">{data?.user.name ?? "....."}</td>
               </tr>
               <tr className="flex flex-col md:flex-row">
                  <td className="border-muted bg-muted p-3 font-semibold dark:bg-muted/40 md:w-56 md:border-r-2 md:bg-transparent dark:md:bg-transparent lg:w-96">
                     E-mail
                  </td>
                  <td className="w-full break-all p-3 md:pl-4">{data?.user.email ?? "....."}</td>
               </tr>
               <tr className="flex flex-col md:flex-row">
                  <td className="border-muted bg-muted p-3 font-semibold dark:bg-muted/40 md:w-56 md:border-r-2 md:bg-transparent dark:md:bg-transparent lg:w-96">
                     Joined on
                  </td>
                  <td className="w-full p-3 md:pl-4">{data?.user.createdAt ?? "....."}</td>
               </tr>
            </tbody>
         </table>
      </section>
   );
}
