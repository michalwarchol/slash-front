import Fetch from "@/utils/requestHandler";

export async function getCourseTypes() {
  const data = await Fetch.get("/courses/types");

  return data;
}
