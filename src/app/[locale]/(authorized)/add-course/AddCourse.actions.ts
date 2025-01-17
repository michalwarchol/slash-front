"use server";

import Fetch from "@/utils/requestHandler";

export async function getCourseTypes() {
  const data = await Fetch.get("/courses/types", { cache: "force-cache" });

  return data;
}
