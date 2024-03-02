import { slugSchema } from "@/validation";

export function parseSlug(params: unknown) {
   const parsedParams = slugSchema.safeParse(params);
   if (!parsedParams.success) throw new Error("Required slug is not present in the URL");
   return parsedParams.data.slug;
}
