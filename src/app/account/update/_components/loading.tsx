import { Skeleton } from "@/components";

export default function Loading() {
   return (
      <section className="space-y-6">
         <div>
            <p className="mb-2 text-sm">User Name</p>
            <Skeleton className="h-10 w-full" />
         </div>
         <div>
            <p className="mb-2 text-sm">User E-mail</p>
            <Skeleton className="h-10 w-full" />
         </div>
         <Skeleton className="h-10 w-full bg-primary" />
      </section>
   );
}
