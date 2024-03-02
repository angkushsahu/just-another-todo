import { z } from "zod";

export const slugSchema = z.object({
   slug: z.string().min(1),
});

export type SlugType = z.infer<typeof slugSchema>;
