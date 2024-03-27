"use client";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Divider, message, Typography } from "antd";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { useState } from "react";

import { Link } from "@/app/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import axios from "@/utils/axios";
import getApiErrorMessage from "@/utils/getApiErrorMessage";

import { initialValues } from "./register.consts";
import {
  TApiErrorMessages,
  TErrorMessages,
  TInitialValues,
  TMessages,
  UserRoles,
} from "./register.types";
import validation from "./register.validation";
import styles from "./styles.module.scss";

const { Text } = Typography;

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

export default function RegisterView({
  messages,
  listItems,
  roles,
  errorMessages,
  apiErrorMessages,
}: IProps) {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const onSubmit = async (values: TInitialValues) => {
    setLoading(true);
    const { data } = await axios.post("users/signup", {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      type: values.role,
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

  return (
    <div className={styles.contentContainer}>
      {contextHolder}
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          <Link href="/">
            <span className={styles.link}>{messages.title}</span>
          </Link>
        </div>
        <div className={styles.list}>
          {listItems.map((item) => (
            <div className={styles.listElement} key={item.key}>
              <CheckCircleOutlined />
              <Text className={styles.listText}>{item.text}</Text>
            </div>
          ))}
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
                <Input name="firstName" placeholder={messages.firstName} />
              </div>
              <div className={styles.inputWrapper}>
                <Input name="lastName" placeholder={messages.lastName} />
              </div>
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
              <div className={styles.inputWrapper}>
                <Input
                  name="confirmPassword"
                  placeholder={messages.confirmPassword}
                  htmlType="password"
                />
              </div>
              <div className={styles.inputWrapper}>
                <Select
                  name="role"
                  placeholder={messages.role}
                  options={roles.map((role) => ({
                    id: role.name,
                    name: role.value,
                  }))}
                />
              </div>
              <div className={styles.buttons}>
                <Button
                  type="submit"
                  className={styles.submitButton}
                  loading={loading}
                >
                  {messages.submit}
                </Button>
                <Text className={styles.buttonsText}>
                  <span>{messages.haveAccount}</span>
                  <Link href="/login">
                    <span className={styles.link}>{messages.login}</span>
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
