"use client";

import { message } from "antd";
import { useState } from "react";

import View from "@/app/[locale]/course/[id]/upload/CourseUpload.view";
import { useRouter } from "@/app/navigation";
import { TVideoEdit } from "@/types/video";
import getApiErrorMessage from "@/utils/getApiErrorMessage";

import { update } from "./VideoEdit.actions";
import { TErrorMessages, TFormValues, TMessages } from "./VideoEdit.types";

interface IProps {
  id: string;
  courseId: string;
  userId: string;
  video: TVideoEdit;
  messages: TMessages;
  errorMessages: TErrorMessages;
}

export default function VideoEditContainer({
  id,
  courseId,
  video,
  messages,
  errorMessages,
}: IProps) {
  const { back, push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (values: TFormValues) => {
    setLoading(true);
    try {
      const data = await update(id, courseId, values);

      setLoading(false);
      if (data.success) {
        push(`/course/${courseId}/watch/${id}`);
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
        isEdit
        messages={messages}
        errorMessages={errorMessages}
        onSubmit={onSubmit}
        onCancel={onCancel}
        loading={loading}
        initialValues={{
          name: video.name,
          description: video.description,
        }}
      />
    </>
  );
}
