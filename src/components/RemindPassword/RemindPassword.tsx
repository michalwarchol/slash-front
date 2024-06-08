"use client";

import { Typography } from "antd";
import { Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useState } from "react";

import Button from "@/components//Button";
import Input from "@/components/Input";

import { initialValues } from "./RemindPassword.consts";
import styles from "./RemindPassword.module.scss";
import { TFormValues } from "./RemindPassword.types";

const { Text } = Typography;

interface IProps {
  loading: boolean;
  onSubmit: (
    values: TFormValues,
    phase: number,
    setPhase: Dispatch<SetStateAction<number>>
  ) => void;
  onComeBack: () => void;
}

export default function RemindPassword({
  onSubmit,
  loading,
  onComeBack,
}: IProps) {
  const [phase, setPhase] = useState(1);
  const t = useTranslations();

  return (
    <div className={styles.remindPassword}>
      <h1 className={styles.formTitle}>{t("RemindPassword.title")}</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => onSubmit(values, phase, setPhase)}
      >
        {({ values }) => (
          <Form>
            {phase === 1 && (
              <div className={styles.inputWrapper}>
                <Input name="email" placeholder={t("RemindPassword.email")} />
              </div>
            )}
            {phase === 2 && (
              <>
                <div className={styles.inputWrapper}>
                  <Input name="code" placeholder={t("RemindPassword.code")} />
                </div>
                <div className={styles.inputWrapper}>
                  <Input
                    name="newPassword"
                    placeholder={t("RemindPassword.newPassword")}
                    htmlType="password"
                  />
                </div>
                <div className={styles.inputWrapper}>
                  <Input
                    name="confirmNewPassword"
                    placeholder={t("RemindPassword.confirmNewPassword")}
                    htmlType="password"
                  />
                </div>
              </>
            )}
            <div className={styles.buttonsWrapper}>
              <Button
                type="submit"
                className={styles.submitButton}
                loading={loading}
              >
                {t(
                  `RemindPassword.${
                    phase === 1 ? "sendMail" : "changePassword"
                  }`
                )}
              </Button>
              {phase === 2 && (
                <Button
                  type="button"
                  className={styles.submitButton}
                  loading={loading}
                  onClick={() => onSubmit(values, 1, setPhase)}
                >
                  {t("RemindPassword.sendMailAgain")}
                </Button>
              )}
            </div>
            <Text className={styles.buttonsText} onClick={onComeBack}>
              {t("RemindPassword.comeBackToLogin")}
            </Text>
          </Form>
        )}
      </Formik>
    </div>
  );
}
