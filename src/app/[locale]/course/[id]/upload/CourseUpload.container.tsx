"use client";

import { message } from "antd";
import { useState } from "react";

import { useRouter } from "@/app/navigation";
import axios from "@/utils/axios";
import getApiErrorMessage from "@/utils/getApiErrorMessage";

import { TErrorMessages, TFormValues, TMessages } from "./CourseUpload.types";
import View from "./CourseUpload.view";

interface IProps {
  id: string;
  userId: string;
  messages: TMessages;
  errorMessages: TErrorMessages;
}

export default function CourseUploadContainer({
  id,
  messages,
  errorMessages,
}: IProps) {
  const { back, push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (values: TFormValues) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("thumbnail", values.thumbnail!.originFileObj!);
    formData.append("video", values.video!.originFileObj!);
    formData.append("name", values.name);
    formData.append("description", values.description);

    try {
      const { data } = await axios.post(`/courses/video/${id}`, formData, {
        headers: {
          "Content-Type": `multipart/form-data;`,
        },
      });

      setLoading(false);
      if (data.success) {
        push(`/course/${id}`);
      } else {
        if (data.errors) {
          messageApi.error(getApiErrorMessage(data.errors, errorMessages));
          return;
        }
      }
    } catch {
      setLoading(false);
    }
  };

  const onCancel = () => {
    back();
  };

  return (
    <>
      {contextHolder}
      <View
        messages={messages}
        errorMessages={errorMessages}
        onSubmit={onSubmit}
        onCancel={onCancel}
        loading={loading}
      />
    </>
  );
}
