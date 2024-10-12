"use client";

import { message } from "antd";
import { useState } from "react";

import { useRouter } from "@/app/navigation";
import getApiErrorMessage from "@/utils/getApiErrorMessage";

import { signUp } from "./register.actions";
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
    const data = await signUp(values);

    setLoading(false);

    if (data.errors) {
      messageApi.error(getApiErrorMessage(data.errors, apiErrorMessages));
      return;
    }

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
