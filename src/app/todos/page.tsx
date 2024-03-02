import { Plus } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "@/components";
import SearchAndTodos from "./_components/searchAndTodos";
import TodoForm from "./_components/todoForm";

export const metadata: Metadata = {
   title: "Your Todos",
};

export default function TodoPage() {
   return (
      <main className="container pb-24 pt-8">
         <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold sm:text-4xl">Your Todos</h1>
            <TodoForm case="Create">
               <Button
                  type="button"
                  size="icon"
                  className="fixed bottom-4 right-6 size-12 rounded-full sm:bottom-8 sm:right-10 md:bottom-10"
               >
                  <Plus className="size-6" />
               </Button>
            </TodoForm>
         </div>
         <SearchAndTodos />
      </main>
   );
}
