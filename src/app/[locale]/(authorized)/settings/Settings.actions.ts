"use server";

import { cookies } from "next/headers";

import getOneDayInMiliseconds from "@/utils/getOneDayInMiliseconds";
import Fetch from "@/utils/requestHandler";

import { TFormValues } from "./Settings.types";

export async function submit(values: TFormValues) {
  const formData = new FormData();
  if (values.avatar) {
    formData.append("avatar", values.avatar.originFileObj!);
  }
  formData.append("firstName", values.firstName);
  formData.append("lastName", values.lastName);

  const response = await Fetch.put("/users/update", { body: formData }, true);

  if (response && response.success) {
    const cookiesStore = await cookies();
    cookiesStore.set("user", JSON.stringify(response.result), {
      expires: Date.now() + getOneDayInMiliseconds(),
      path: "/",
    });
  }

  return response;
}
