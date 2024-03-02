"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes } from "react";

import { cn } from "@/lib";

export interface CurrentLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
   href: string;
   title: string;
}

export default function CurrentLink({ href, title, ...props }: CurrentLinkProps) {
   const pathname = usePathname();
   const { className, ...restProps } = props;

   return (
      <Link href={href} className={cn(pathname === href ? "text-primary" : "", className)} {...restProps}>
         {title}
      </Link>
   );
}
