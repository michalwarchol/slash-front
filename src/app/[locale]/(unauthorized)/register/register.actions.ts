"use server";

import Fetch from "@/utils/requestHandler";

export async function getUserRoles() {
  const data = await Fetch.get("/users/roles");

  return data;
}
