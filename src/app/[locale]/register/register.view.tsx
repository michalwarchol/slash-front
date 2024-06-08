"use client";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Divider, Typography } from "antd";
import { Form, Formik } from "formik";

import { Link } from "@/app/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";

import { initialValues } from "./register.consts";
import {
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
  listItems: {
    key: string;
    text: string;
  }[];
  loading: boolean;
  onSubmit: (values: TInitialValues) => void;
};

export default function RegisterView({
  messages,
  listItems,
  roles,
  errorMessages,
  loading,
  onSubmit,
}: IProps) {
  return (
    <div className={styles.contentContainer}>
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
