"use server";

import { cookies } from "next/headers";

async function setToken(token: string) {
  cookies().set("token", token, { secure: true, expires:  1000 * 60 * 60 * 24 }); // expires after 1 day
}

export { setToken };
