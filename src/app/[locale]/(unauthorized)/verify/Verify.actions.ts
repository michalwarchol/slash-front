"use server";

import { revalidatePath } from "next/cache";

import Fetch from "@/utils/requestHandler";

export async function verify(code: string) {
  const data = await Fetch.post("/users/verify-user", {
    body: JSON.stringify({
      code,
    }),
  });

  revalidatePath("/");

  return data;
}
