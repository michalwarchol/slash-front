"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import getOneDayInMiliseconds from "@/utils/getOneDayInMiliseconds";
import Fetch from "@/utils/requestHandler";

export async function verify(code: string) {
  const data = await Fetch.post("/users/verify-user", {
    body: JSON.stringify({
      code,
    }),
  });

  if (data.result) {
    const cookieStore = await cookies();
    cookieStore.set("token", data.result.accessToken, {
      expires: Date.now() + getOneDayInMiliseconds(),
      path: "/",
    });
    cookieStore.set("user", JSON.stringify(data.result.user), {
      expires: Date.now() + getOneDayInMiliseconds(),
      path: "/",
    });
  }

  revalidatePath("/");

  return data;
}
