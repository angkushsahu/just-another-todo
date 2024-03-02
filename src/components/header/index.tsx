import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/icon.webp";
import { homeUrl } from "@/constants";
import { getServerAuthSession } from "@/server/auth";
import DesktopNav from "./desktopNav";
import MobileNav from "./mobileNav";
import ToggleTheme from "./toggleTheme";

export async function Header() {
   const session = await getServerAuthSession();

   return (
      <header className="sticky top-0 z-10 bg-background py-5 shadow-md dark:shadow-black">
         <div className="container flex items-center justify-between">
            <section className="flex items-center gap-x-4">
               <Link href={homeUrl}>
                  <Image src={logo} alt="Logo Icon" width={40} height={40} />
               </Link>
               <Link href={homeUrl} className="hidden text-lg font-semibold sm:block">
                  Just Another Todo
               </Link>
            </section>
            <nav className="flex items-center gap-x-4 sm:gap-x-8">
               <DesktopNav isAuth={!!session} />
               <ToggleTheme />
               <MobileNav isAuth={!!session} />
            </nav>
         </div>
      </header>
   );
}
