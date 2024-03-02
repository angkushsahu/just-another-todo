import type { TodoReturn } from "@/models";

export interface UpdateFormProps extends TodoReturn {
   case: "Update";
}

export interface CreateFormProps {
   case: "Create";
}

export type TodoEditFormProps = UpdateFormProps | CreateFormProps;
