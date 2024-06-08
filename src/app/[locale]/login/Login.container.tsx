"use client";

import { message } from "antd";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction, useState } from "react";

import axios from "@/utils/axios";
import getApiErrorMessage from "@/utils/getApiErrorMessage";

import {
  TApiErrorMessages,
  TErrorMessages,
  TInitialValues,
  TMessages,
  TRemindPasswordValues,
} from "./Login.types";
import View from "./Login.view";

type IProps = {
  messages: TMessages;
  errorMessages: TErrorMessages;
  apiErrorMessages: TApiErrorMessages;
};

export default function LoginContainer({
  messages,
  errorMessages,
  apiErrorMessages,
}: IProps) {
  const [loading, setLoading] = useState(false);
  const [isRemindPassword, setIsRemindPassword] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (values: TInitialValues) => {
    setLoading(true);
    const { data } = await axios.post("users/signin", {
      email: values.email,
      password: values.password,
    });

    setLoading(false);

    if (data.errors) {
      messageApi.error(getApiErrorMessage(data.errors, apiErrorMessages));
      return;
    }

    Cookies.set("token", data.result.accessToken, { expires: 1, path: "/" });
    Cookies.set("user", JSON.stringify(data.result.user), {
      expires: 1,
      path: "/",
    });

    window.location.href = "/";
  };

  const onRemindPasswordSubmit = async (
    values: TRemindPasswordValues,
    phase: number,
    setPhase: Dispatch<SetStateAction<number>>
  ) => {
    let response;
    if (phase === 1) {
      response = await axios.post("/users/request-password-remind", {
        email: values.email,
      });
      if (response.data.success) {
        messageApi.info(messages.remindPasswordSuccessPhaseOne);
        setPhase(2);
      } else {
        messageApi.error(
          getApiErrorMessage(response.data.errors, apiErrorMessages)
        );
      }
    }

    if (phase === 2) {
      response = await axios.post("/users/remind-password", {
        email: values.email,
        password: values.newPassword,
        code: values.code,
      });

      if (response.data.errors) {
        messageApi.error(
          getApiErrorMessage(response.data.errors, apiErrorMessages)
        );
        return;
      }

      if (response.data.success) {
        messageApi.success(messages.remindPasswordSuccessPhaseTwo);
        setIsRemindPassword(false);
      }
    }
  };

  return (
    <>
      {contextHolder}
      <View
        messages={messages}
        errorMessages={errorMessages}
        loading={loading}
        onSubmit={onSubmit}
        onRemindPasswordSubmit={onRemindPasswordSubmit}
        isRemindPassword={isRemindPassword}
        setIsRemindPassword={setIsRemindPassword}
      />
    </>
  );
}
