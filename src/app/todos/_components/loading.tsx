import { Skeleton } from "@/components";

export default function Loading() {
   return (
      <div>
         <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
               <Skeleton key={`Loading-todo-${idx + 1}`} className="h-40" />
            ))}
         </section>
      </div>
   );
}
