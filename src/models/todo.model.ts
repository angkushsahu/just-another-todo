import { type Document, type InferSchemaType, type Model, Schema, model, models } from "mongoose";

export const todoSchema = new Schema(
   {
      title: { type: String, required: [true, "Please enter todo title"] },
      description: { type: String, default: "" },
      priority: { type: Boolean, default: false },
      completed: { type: Boolean, default: false },
      userId: { type: Schema.Types.ObjectId, ref: "user", required: [true, "Please enter user ID"] },
   },
   { timestamps: true }
);

export type ITodo = InferSchemaType<typeof todoSchema>;

export type TodoReturn = Pick<ITodo, "completed" | "description" | "priority" | "title" | "userId"> & {
   id: string;
   createdAt: string;
};

export interface TodoMethods {
   returnTodo(): TodoReturn;
}

export type TodoModel = Model<ITodo, unknown, TodoMethods>;

todoSchema.methods.returnTodo = function (this: Document & ITodo): TodoReturn {
   const formattedDate = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(
      this.createdAt as Date
   );

   return {
      completed: this.completed,
      createdAt: formattedDate,
      description: this.description,
      priority: this.priority,
      title: this.title,
      userId: this.userId,
      id: String(this.id),
   };
};

export const Todo: TodoModel = models.todo ?? model<ITodo, TodoModel>("todo", todoSchema);
