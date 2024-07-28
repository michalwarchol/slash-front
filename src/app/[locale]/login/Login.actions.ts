"use server";

import { revalidatePath } from "next/cache";

import Fetch from "@/utils/requestHandler";

import { TInitialValues, TRemindPasswordValues } from "./Login.types";

export async function signIn(values: TInitialValues) {
  const data = await Fetch.post("/users/signin", {
    body: JSON.stringify({
      email: values.email,
      password: values.password,
    }),
  });

  revalidatePath("/");

  return data;
}

export async function requestPasswordRemind(values: TRemindPasswordValues) {
  const data = await Fetch.post("/users/request-password-remind", {
    body: JSON.stringify({
      email: values.email,
    }),
  });

  return data;
}

export async function remindPassword(values: TRemindPasswordValues) {
  const data = await Fetch.post("/users/remind-password", {
    body: JSON.stringify({
      email: values.email,
      password: values.newPassword,
      code: values.code,
    }),
  });

  return data;
}
