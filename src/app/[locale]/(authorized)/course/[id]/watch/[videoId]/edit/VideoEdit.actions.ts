"use server";

import { revalidatePath } from "next/cache";

import { TVideoEdit } from "@/types/video";
import Fetch from "@/utils/requestHandler";

import { TFormValues } from "./VideoEdit.types";

export async function getVideo(id: string): Promise<TVideoEdit | null> {
  const data = await Fetch.get(`/video/${id}`, { cache: "no-store" });

  if (!data || data.statusCode === 404) {
    return null;
  }

  return {
    ...data,
    name: data.name,
    description: data.description,
    creatorId: data.course.creator.id,
  };
}

export async function update(
  id: string,
  courseId: string,
  values: TFormValues
) {
  const data = await Fetch.put(`/video/${id}`, {
    body: JSON.stringify({
      name: values.name,
      description: values.description,
    }),
  });

  if (data.success) {
    revalidatePath(`/course/${courseId}/watch/${id}`);
    revalidatePath(`/course/${courseId}/watch/${id}/edit`);
  }

  return data;
}
