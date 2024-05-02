import axios from '@/utils/axios';

export async function getCourse(
  lang: string,
  id?: string | string[],
  userId?: string
) {
  if (!id) {
    return {};
  }

  const { data } = await axios.get(`/courses/course/${id}`);

  if (!data) {
    return {
      course: null,
      statistics: null,
    };
  }

  const course = {
    ...data,
    type: {
      id: data.type.id,
      name: data.type.name,
      value: lang && lang === "pl" ? data.type.valuePl : data.type.valueEn,
      mainType: {
        id: data.type.mainType.id,
        name: data.type.mainType.name,
        value:
          lang && lang === "pl"
            ? data.type.mainType.valuePl
            : data.type.mainType.valueEn,
      },
    },
  };

  if (userId) {
    const { data: statistics } = await axios.get(
      `/courses/user_statistics/${id}`
    );

    return {
      course,
      statistics,
    };
  }

  return {
    course,
    statistics: {
      isLiked: false,
    },
  };
}
