import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { redirect } from "@/app/navigation";

export const dynamic = "force-static";

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.set("token", "", { secure: true, expires: 1 });
  cookieStore.set("user", "", { secure: true, expires: 1 });

  redirect("/login");

  return NextResponse.json({});
}
