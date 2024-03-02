import "@/styles/globals.css";

import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { Header, Toaster, viewportMeta, webMeta } from "@/components";
import { ThemeProvider } from "@/providers";
import { TRPCReactProvider } from "@/trpc/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const viewport = viewportMeta;
export const metadata = webMeta;

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body className={`min-h-screen bg-background font-sans antialiased ${inter.variable}`}>
            <TRPCReactProvider>
               <ThemeProvider>
                  <Header />
                  <>{children}</>
                  <Toaster />
               </ThemeProvider>
            </TRPCReactProvider>
         </body>
      </html>
   );
}
