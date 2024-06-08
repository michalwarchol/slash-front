"use client";

import { message } from "antd";
import Cookies from "js-cookie";
import { useState } from "react";

import axios from "@/utils/axios";
import getApiErrorMessage from "@/utils/getApiErrorMessage";

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

  const onSubmit = async (values: TFormValues) => {
    setLoading(true);
    const { data } = await axios.post("/users/verify-user", {
      code: values.code,
    });

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

      window.location.href = "/";
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
