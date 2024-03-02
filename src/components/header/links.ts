import { accountUrl, loginUrl, registerUrl, todoUrl } from "@/constants";

export const authLinks = [
   { href: todoUrl, title: "Todos" },
   { href: accountUrl, title: "Account" },
];

export const unAuthLinks = [
   { href: loginUrl, title: "Login" },
   { href: registerUrl, title: "Register" },
];
