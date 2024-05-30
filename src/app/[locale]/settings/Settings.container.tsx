"use client";
import { message } from "antd";
import Cookies from "js-cookie";
import { useState } from "react";

import axios from "@/utils/axios";
import getApiErrorMessage from "@/utils/getApiErrorMessage";

import { TErrorMessages, TFormValues, TMessages } from "./Settings.types";
import View from "./Settings.view";

interface IProps {
  avatar: string | null;
  initialValues: TFormValues;
  messages: TMessages;
  errorMessages: TErrorMessages;
}

export default function SettingsContainer({
  avatar,
  initialValues,
  messages,
  errorMessages,
}: IProps) {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (values: TFormValues) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("avatar", values.avatar!.originFileObj!);
    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);

    try {
      const response = await axios.put("/users/update", formData, {
        headers: {
          "Content-Type": `multipart/form-data;`,
        },
      });

      setLoading(false);
      if (response.data && response.data.success) {
        Cookies.set("user", JSON.stringify(response.data.result), {
          expires: 1,
          path: "/",
        });
        messageApi.success(messages.success);
      } else {
        if (!response.data) {
          messageApi.error(errorMessages.fileTooLarge);
          return;
        }

        if (!response.data.success || response.data.errors) {
          messageApi.error(
            getApiErrorMessage(response.data.errors, errorMessages)
          );
          return;
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <View
        avatar={avatar}
        loading={loading}
        initialValues={initialValues}
        messages={messages}
        errorMessages={errorMessages}
        onSubmit={onSubmit}
      />
    </>
  );
}
