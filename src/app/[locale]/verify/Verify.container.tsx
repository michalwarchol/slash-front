"use client";

import { message } from "antd";
import Cookies from "js-cookie";
import { useState } from "react";

import { useRouter } from "@/app/navigation";
import getApiErrorMessage from "@/utils/getApiErrorMessage";

import { verify } from "./Verify.actions";
import {
  TApiErrorMessages,
  TErrorMessages,
  TFormValues,
  TMessages,
} from "./Verify.types";
import View from "./Verify.view";

interface IProps {
  messages: TMessages;
  errorMessages: TErrorMessages;
  apiErrorMessages: TApiErrorMessages;
}

export default function VerifyContainer({
  messages,
  errorMessages,
  apiErrorMessages,
}: IProps) {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();

  const onSubmit = async (values: TFormValues) => {
    setLoading(true);
    const data = await verify(values.code);

    if (data.errors) {
      messageApi.error(getApiErrorMessage(data.errors, apiErrorMessages));
      return;
    }

    if (data.result) {
      Cookies.set("token", data.result.accessToken, { expires: 1, path: "/" });
      Cookies.set("user", JSON.stringify(data.result.user), {
        expires: 1,
        path: "/",
      });

      router.push("/");
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
      />
    </>
  );
}
