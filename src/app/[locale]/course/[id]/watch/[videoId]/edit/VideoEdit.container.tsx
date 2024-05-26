"use client";

import { message } from "antd";
import { useEffect, useState } from "react";

import View from "@/app/[locale]/course/[id]/upload/CourseUpload.view";
import { useRouter } from "@/app/navigation";
import { TVideoEdit } from "@/types/video";
import axios from "@/utils/axios";
import getApiErrorMessage from "@/utils/getApiErrorMessage";

import { TErrorMessages, TFormValues, TMessages } from "./VideoEdit.types";
import { getVideo } from "./VideoEdit.utils";

interface IProps {
  id: string;
  courseId: string;
  userId: string;
  messages: TMessages;
  errorMessages: TErrorMessages;
}

export default function CourseEditContainer({
  id,
  userId,
  courseId,
  messages,
  errorMessages,
}: IProps) {
  const { back, push } = useRouter();
  const [data, setData] = useState<TVideoEdit | null>(null);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (values: TFormValues) => {
    setLoading(true);
    try {
      const { data } = await axios.put(`/video/${id}`, {
        name: values.name,
        description: values.description,
      });

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

  useEffect(() => {
    getVideo(id).then((response) => {
      setLoading(false);
      if (response === null || response.creatorId !== userId) {
        back();
        return;
      }
      setData(response);
    });
  }, []);

  return (
    <>
      {contextHolder}
      {data && (
        <View
          isEdit
          messages={messages}
          errorMessages={errorMessages}
          onSubmit={onSubmit}
          onCancel={onCancel}
          loading={loading}
          initialValues={{
            name: data.name,
            description: data.description,
          }}
        />
      )}
    </>
  );
}
