"use server";

import { cookies } from "next/headers";

import axios from "@/utils/axios";

export async function setToken(token: string) {
  cookies().set("token", token, { secure: true, expires: 1000 * 60 * 60 * 24 }); // expires after 1 day
}

export async function me() {
  const { data } = await axios.get("/users/me");

  return data;
}

export async function getUserRoles() {
  const { data } = await axios.get("/users/roles");

  return data;
}
