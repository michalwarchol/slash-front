import { Divider } from "antd";
import { Form, Formik } from "formik";

import { Link } from "@/app/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";

import { initialValues } from "./Verify.consts";
import styles from "./Verify.module.scss";
import { TErrorMessages, TFormValues, TMessages } from "./Verify.types";
import validation from "./Verify.validation";

interface IProps {
  messages: TMessages;
  errorMessages: TErrorMessages;
  loading: boolean;
  onSubmit: (values: TFormValues) => void;
}

export default function VerifyView({
  messages,
  errorMessages,
  loading,
  onSubmit,
}: IProps) {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>
          <span className={styles.link}>{messages.title}</span>
        </div>
        <div className={styles.content}>{messages.content}</div>
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
                <Input name="code" placeholder={messages.code} />
              </div>
              <div className={styles.buttons}>
                <Button
                  type="submit"
                  className={styles.submitButton}
                  loading={loading}
                >
                  {messages.submit}
                </Button>
                <div className={styles.logoutButtonWrapper}>
                  <Link href="/logout">
                    <Button
                      type="button"
                      className={styles.submitButton}
                      disabled={loading}
                    >
                      {messages.logout}
                    </Button>
                  </Link>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
