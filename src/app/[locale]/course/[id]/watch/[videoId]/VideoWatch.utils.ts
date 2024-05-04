import { TVideoResponse } from "@/types/course";
import axios from "@/utils/axios";

export async function getVideo(
  id: string,
  lang: string
): Promise<TVideoResponse | null> {
  const { data } = await axios.get(`/video/${id}`);

  if (!data) {
    return null;
  }

  const type = data.course.type;
  const mainType = data.course.type.mainType;

  return {
    ...data,
    course: {
      ...data.course,
      type: {
        id: type.id,
        name: type.name,
        value: lang && lang === "pl" ? type.valuePl : type.valueEn,
        mainType: {
          id: mainType.id,
          name: mainType.name,
          value: lang && lang === "pl" ? mainType.valuePl : mainType.valueEn,
        },
      },
    },
  };
}
