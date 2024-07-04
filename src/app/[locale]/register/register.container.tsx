"use client";

import { message } from "antd";
import Cookies from "js-cookie";
import { useState } from "react";

import { useRouter } from "@/app/navigation";
import getApiErrorMessage from "@/utils/getApiErrorMessage";
import Fetch from "@/utils/requestHandler";

import {
  TApiErrorMessages,
  TErrorMessages,
  TInitialValues,
  TMessages,
  UserRoles,
} from "./register.types";
import View from "./register.view";

type IProps = {
  roles: UserRoles;
  messages: TMessages;
  errorMessages: TErrorMessages;
  apiErrorMessages: TApiErrorMessages;
  listItems: {
    key: string;
    text: string;
  }[];
};

export default function RegisterContainer({
  messages,
  listItems,
  roles,
  errorMessages,
  apiErrorMessages,
}: IProps) {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { push } = useRouter();
  const onSubmit = async (values: TInitialValues) => {
    setLoading(true);
    const data = await Fetch.post("/users/signup", {
      body: JSON.stringify({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        type: values.role,
      }),
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

    push("/verify");
  };

  return (
    <>
      {contextHolder}
      <View
        errorMessages={errorMessages}
        listItems={listItems}
        loading={loading}
        messages={messages}
        onSubmit={onSubmit}
        roles={roles}
      />
    </>
  );
}
