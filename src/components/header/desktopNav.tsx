import CurrentLink from "./currentLink";
import { authLinks, unAuthLinks } from "./links";

export default function DesktopNav({ isAuth }: { isAuth: boolean }) {
   const navLinks = isAuth ? authLinks : unAuthLinks;
   return navLinks.map((link) => <CurrentLink key={link.title} {...link} className="hidden text-sm md:block" />);
}
