"use client";

import { message } from "antd";
import Cookies from "js-cookie";
import { Dispatch, SetStateAction, useState } from "react";

import { useRouter } from "@/app/navigation";
import getApiErrorMessage from "@/utils/getApiErrorMessage";

import { remindPassword, requestPasswordRemind, signIn } from "./Login.actions";
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
  const router = useRouter();

  const onSubmit = async (values: TInitialValues) => {
    setLoading(true);
    const data = await signIn(values);

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

    router.push("/");
  };

  const onRemindPasswordSubmit = async (
    values: TRemindPasswordValues,
    phase: number,
    setPhase: Dispatch<SetStateAction<number>>
  ) => {
    let response;
    if (phase === 1) {
      response = await requestPasswordRemind(values);
      if (response.success) {
        messageApi.info(messages.remindPasswordSuccessPhaseOne);
        setPhase(2);
      } else {
        messageApi.error(getApiErrorMessage(response.errors, apiErrorMessages));
      }
    }

    if (phase === 2) {
      response = await remindPassword(values);

      if (response.errors) {
        messageApi.error(getApiErrorMessage(response.errors, apiErrorMessages));
        return;
      }

      if (response.success) {
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
