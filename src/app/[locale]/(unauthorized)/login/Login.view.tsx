"use client";
import { Divider, Typography } from "antd";
import cls from "classnames";
import { Form, Formik } from "formik";
import { Dispatch, SetStateAction } from "react";

import { Link } from "@/app/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import RemindPassword from "@/components/RemindPassword";

import { initialValues } from "./Login.consts";
import styles from "./Login.module.scss";
import {
  TErrorMessages,
  TInitialValues,
  TMessages,
  TRemindPasswordValues,
} from "./Login.types";
import validation from "./Login.validation";

const { Paragraph, Text } = Typography;

type IProps = {
  messages: TMessages;
  errorMessages: TErrorMessages;
  loading: boolean;
  isRemindPassword: boolean;
  setIsRemindPassword: Dispatch<SetStateAction<boolean>>;
  onSubmit: (values: TInitialValues) => void;
  onRemindPasswordSubmit: (
    values: TRemindPasswordValues,
    phase: number,
    setPhase: Dispatch<SetStateAction<number>>
  ) => void;
};

export default function LoginView({
  messages,
  errorMessages,
  loading,
  onSubmit,
  onRemindPasswordSubmit,
  isRemindPassword,
  setIsRemindPassword,
}: IProps) {
  return (
    <div className={styles.contentContainer}>
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
      {isRemindPassword ? (
        <RemindPassword
          loading={false}
          onComeBack={() => setIsRemindPassword(false)}
          onSubmit={onRemindPasswordSubmit}
        />
      ) : (
        <div className={styles.formContainer}>
          <h1 className={styles.formTitle}>{messages.formTitle}</h1>
          <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={validation(errorMessages)}
          >
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
                <Text
                  className={cls(styles.buttonsText, styles.remindPasswordText)}
                  onClick={() => setIsRemindPassword(true)}
                >
                  {messages.remindPassword}
                </Text>
              </div>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
}
