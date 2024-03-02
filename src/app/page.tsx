import Link from "next/link";

import { Button } from "@/components";
import { loginUrl, registerUrl } from "@/constants";

export default function HomePage() {
   return (
      <main className="container flex min-h-page flex-col justify-center md:items-center md:text-center">
         <h1 className="text-4xl font-semibold">Effortless Task Management Solution</h1>
         <h2 className="my-6 text-xl text-muted-foreground md:max-w-xl md:text-center">
            Simplify your day with our intuitive todo application for seamless task organization and tracking
         </h2>
         <div className="flex items-center gap-5">
            <Link href={loginUrl}>
               <Button type="button" className="w-28">
                  Login
               </Button>
            </Link>
            <Link href={registerUrl}>
               <Button type="button" variant="secondary" className="w-28">
                  Register
               </Button>
            </Link>
         </div>
      </main>
   );
}
