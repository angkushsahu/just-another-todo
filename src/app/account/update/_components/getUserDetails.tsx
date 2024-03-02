"use client";

import { api } from "@/trpc/react";
import UpdateAccountForm from "./form";
import Loading from "./loading";

export default function GetUserDetails() {
   const { data, error, isError, isLoading } = api.user.getUser.useQuery();
   if (isError) throw new Error(error.message);
   if (!data || isLoading) return <Loading />;

   return <UpdateAccountForm {...data.user} />;
}
