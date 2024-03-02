import { genSalt, hash } from "bcrypt";
import { type Document, type InferSchemaType, type Model, Schema, model, models } from "mongoose";

export const userSchema = new Schema(
   {
      name: { type: String, required: [true, "Please enter your name"] },
      email: { type: String, required: [true, "Please enter your e-mail"], unique: true },
      password: { type: String, required: [true, "Please enter a password"] },
      resetPassword: { type: String, default: "" },
   },
   { timestamps: true }
);

export type IUser = InferSchemaType<typeof userSchema>;

// hashing password
userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) next();

   const salt = await genSalt(10);
   this.password = await hash(this.password, salt);
});

export type UserReturn = Pick<IUser, "email" | "name"> & { id: string; createdAt: string };

export interface UserMethods {
   returnUser(): UserReturn;
}

export type UserModel = Model<IUser, unknown, UserMethods>;

userSchema.methods.returnUser = function (this: Document & IUser): UserReturn {
   const formattedDate = new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(
      this.createdAt as Date
   );

   return {
      createdAt: formattedDate,
      email: this.email,
      id: String(this.id),
      name: this.name,
   };
};

export const User: UserModel = models.user ?? model<IUser, UserModel>("user", userSchema);
