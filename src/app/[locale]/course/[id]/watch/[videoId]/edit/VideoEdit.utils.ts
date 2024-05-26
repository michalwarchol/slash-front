import { TVideoEdit } from "@/types/video";
import axios from "@/utils/axios";

import { TErrorMessages, TMessages } from "./VideoEdit.types";

export async function getVideo(id: string): Promise<TVideoEdit | null> {
  const { data } = await axios.get(`/video/${id}`);

  if (!data) {
    return null;
  }

  return {
    ...data,
    name: data.name,
    description: data.description,
    creatorId: data.course.creator.id,
  };
}

export const getMessages = (t: (key: string) => string): TMessages => {
  return {
    title: t("VideoEdit.title"),
    name: t("CourseUpload.name"),
    description: t("CourseUpload.description"),
    uploadButton: t("CourseUpload.uploadButton"),
    submit: t("VideoEdit.save"),
    cancel: t("CourseUpload.cancel"),
  };
};

export const getErrorMessages = (
  t: (key: string) => string
): TErrorMessages => {
  return {
    default: t("apiErrors.default"),
    required: t("errors.required"),
  };
};
