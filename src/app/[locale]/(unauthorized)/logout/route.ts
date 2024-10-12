import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { redirect } from "@/app/navigation";

export async function GET() {
  cookies().set("token", "", { secure: true, expires: 1 });
  cookies().set("user", "", { secure: true, expires: 1 });

  redirect("/login");

  return NextResponse.json({});
}
