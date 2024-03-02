"use client";

import { useState } from "react";

import { Button } from "@/components";
import type { FilterValuesType, MarkedValuesType } from "@/lib";
import { api } from "@/trpc/react";
import EmptyTodos from "./emptyTodos";
import Loading from "./loading";
import SearchBox from "./searchBox";
import TodoCard from "./todoCard";

export default function SearchAndTodos() {
   const [completed, setCompleted] = useState<MarkedValuesType>("all");
   const [priority, setPriority] = useState<FilterValuesType>("all");
   const [search, setSearch] = useState("");

   const { data, error, fetchNextPage, hasNextPage, isError, isFetchingNextPage, isLoading } =
      api.todo.getAllTodos.useInfiniteQuery(
         { limit: 10, completed, priority, search },
         {
            getNextPageParam: (lastPage, allPages) => {
               const { totalPages } = lastPage;
               return allPages.length < totalPages ? allPages.length + 1 : undefined;
            },
         }
      );
   if (isError) throw new Error(error.message);

   return (
      <div>
         <SearchBox
            completed={completed}
            setCompleted={setCompleted}
            priority={priority}
            setPriority={setPriority}
            search={search}
            setSearch={setSearch}
         />
         {/* Loading -- start */}
         {!data || isLoading ? (
            <Loading />
         ) : // Loading -- end
         // Todos -- start
         data.pages[0]?.todos.length ? (
            <>
               <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
                  {data.pages.map((page) => page.todos.map((todo) => <TodoCard key={String(todo.id)} {...todo} />))}
               </section>
               {hasNextPage ? (
                  <div className="mt-8 flex items-center justify-center">
                     <Button type="button" variant="outline" onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
                        Load More ....
                     </Button>
                  </div>
               ) : null}
            </>
         ) : (
            // Todos -- end
            <EmptyTodos />
         )}
      </div>
   );
}
