"use server";

import { cookies } from "next/headers";

import getOneDayInMiliseconds from "@/utils/getOneDayInMiliseconds";
import Fetch from "@/utils/requestHandler";

import { TInitialValues } from "./register.types";

export async function getUserRoles() {
  const data = await Fetch.get("/users/roles");

  return data;
}

export async function signUp(values: TInitialValues) {
  const data = await Fetch.post("/users/signup", {
    body: JSON.stringify({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      type: values.role,
    }),
  });

  if (data.result) {
    cookies().set("token", data.result.accessToken, {
      expires: Date.now() + getOneDayInMiliseconds(),
      path: "/",
    });
    cookies().set("user", JSON.stringify(data.result.user), {
      expires: Date.now() + getOneDayInMiliseconds(),
      path: "/",
    });
  }

  return data;
}
