"use client";
import { message } from "antd";
import { FormikHelpers } from "formik";
import { useState } from "react";

import getApiErrorMessage from "@/utils/getApiErrorMessage";
import Fetch from "@/utils/requestHandler";

import { submit } from "./Settings.actions";
import {
  TApiErrorMessages,
  TChangePasswordFormValues,
  TErrorMessages,
  TFormValues,
  TMessages,
} from "./Settings.types";
import View from "./Settings.view";

interface IProps {
  avatar: string | null;
  initialValues: TFormValues;
  messages: TMessages;
  errorMessages: TErrorMessages;
  apiErrorMessages: TApiErrorMessages;
}

export default function SettingsContainer({
  avatar,
  initialValues,
  messages,
  errorMessages,
  apiErrorMessages,
}: IProps) {
  const [loading, setLoading] = useState(false);
  const [loadingPasswordChange, setLoadingPasswordChange] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (values: TFormValues) => {
    setLoading(true);

    try {
      const response = await submit(values);
      setLoading(false);

      if (response && response.success) {
        messageApi.success(messages.success);
      } else {
        if (!response) {
          messageApi.error(errorMessages.fileTooLarge);
          return;
        }

        if (!response.success || response.errors) {
          messageApi.error(getApiErrorMessage(response.errors, errorMessages));
          return;
        }
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onSubmitPasswordChange = async (
    values: TChangePasswordFormValues,
    formikHelpers: FormikHelpers<TChangePasswordFormValues>
  ) => {
    setLoadingPasswordChange(true);
    const data = await Fetch.post("/users/change-password", {
      body: JSON.stringify({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      }),
    });

    setLoadingPasswordChange(false);

    if (data.errors) {
      messageApi.error(getApiErrorMessage(data.errors, apiErrorMessages));
      return;
    }

    if (data.result) {
      messageApi.success(messages.success);
      formikHelpers.resetForm();
    }
  };

  return (
    <>
      {contextHolder}
      <View
        avatar={avatar}
        loading={loading}
        loadingPasswordChange={loadingPasswordChange}
        initialValues={initialValues}
        messages={messages}
        errorMessages={errorMessages}
        onSubmit={onSubmit}
        onSubmitPasswordChange={onSubmitPasswordChange}
      />
    </>
  );
}
