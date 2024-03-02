import type { PropsWithChildren } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components";
import TodoEditForm from "./form";
import type { TodoEditFormProps } from "./types";

export type TodoFormProps = TodoEditFormProps & PropsWithChildren;

export default function TodoForm(props: TodoFormProps) {
   return (
      <Dialog>
         <DialogTrigger asChild>{props.children}</DialogTrigger>
         <DialogContent className="sm:max-w-md">
            {props.case === "Create" ? <TodoEditForm case="Create" /> : <TodoEditForm {...props} />}
         </DialogContent>
      </Dialog>
   );
}
