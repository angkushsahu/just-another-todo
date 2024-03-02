import { Menu } from "lucide-react";

import { Button, Sheet, SheetContent, SheetTrigger } from "@/components";
import CurrentLink from "./currentLink";
import { authLinks, unAuthLinks } from "./links";

export default function MobileNav({ isAuth }: { isAuth: boolean }) {
   const navLinks = isAuth ? authLinks : unAuthLinks;

   return (
      <Sheet>
         <SheetTrigger asChild className="bg-transparent md:hidden">
            <Button variant="outline" size="icon" className="rounded-full" type="button">
               <Menu className="block size-5 " />
            </Button>
         </SheetTrigger>
         <SheetContent className="md:hidden">
            <nav className="mt-10 flex flex-col gap-y-5">
               {navLinks.map((link) => (
                  <CurrentLink key={link.title} {...link} />
               ))}
            </nav>
         </SheetContent>
      </Sheet>
   );
}
