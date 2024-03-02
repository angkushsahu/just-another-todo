"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { type PropsWithChildren, useState } from "react";

import type { AppRouter } from "@/server/api/root";
import { getUrl, transformer } from "./shared";

export const api = createTRPCReact<AppRouter>({ abortOnUnmount: true });

export function TRPCReactProvider({ children }: PropsWithChildren) {
   const [queryClient] = useState(() => new QueryClient());

   const [trpcClient] = useState(() =>
      api.createClient({
         transformer,
         links: [
            loggerLink({
               enabled: (op) => process.env.NODE_ENV === "development" || (op.direction === "down" && op.result instanceof Error),
            }),
            unstable_httpBatchStreamLink({
               url: getUrl(),
            }),
         ],
      })
   );

   return (
      <QueryClientProvider client={queryClient}>
         <api.Provider client={trpcClient} queryClient={queryClient}>
            {children}
         </api.Provider>
      </QueryClientProvider>
   );
}