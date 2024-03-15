"use client";
import { Divider, message, Typography } from "antd";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { useState } from "react";

import { Link } from "@/app/navigation";
import { useRouter } from "@/app/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "@/utils/axios";
import getApiErrorMessage from "@/utils/getApiErrorMessage";

import { initialValues } from "./Login.consts";
import styles from "./Login.module.scss";
import {
  TApiErrorMessages,
  TErrorMessages,
  TInitialValues,
  TMessages,
} from "./Login.types";
import validation from "./Login.validation";

const { Paragraph, Text } = Typography;

type IProps = {
  messages: TMessages;
  errorMessages: TErrorMessages;
  apiErrorMessages: TApiErrorMessages;
};

export default function RegisterView({
  messages,
  errorMessages,
  apiErrorMessages,
}: IProps) {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { push } = useRouter();
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

    push("/");
  };

  return (
    <div className={styles.contentContainer}>
      {contextHolder}
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          <Link href="/">
            <span className={styles.link}>{messages.title}</span>
          </Link>
        </div>
        <div className={styles.content}>
          <Paragraph className={styles.contentParagraph}>
            {messages.titleContentP1}
          </Paragraph>
          <Paragraph className={styles.contentParagraph}>
            {messages.titleContentP2}
          </Paragraph>
        </div>
      </div>
      <Divider type="vertical" className={styles.divider} />
      <div className={styles.formContainer}>
        <h1 className={styles.formTitle}>{messages.formTitle}</h1>
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={validation(errorMessages)}
        >
          {() => (
            <Form>
              <div className={styles.inputWrapper}>
                <Input name="email" placeholder={messages.email} />
              </div>
              <div className={styles.inputWrapper}>
                <Input
                  name="password"
                  placeholder={messages.password}
                  htmlType="password"
                />
              </div>
              <div className={styles.buttons}>
                <Button
                  type="submit"
                  className={styles.submitButton}
                  loading={loading}
                >
                  {messages.login}
                </Button>
                <Text className={styles.buttonsText}>
                  <span>{messages.dontHaveAccount}</span>
                  <Link href="/register">
                    <span className={styles.link}>{messages.register}</span>
                  </Link>
                </Text>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
