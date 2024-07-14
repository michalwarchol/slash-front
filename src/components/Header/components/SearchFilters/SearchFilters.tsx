"use client";

import { Form, Formik } from "formik";

import Cascader from "@/components/Cascader";
import { TOption } from "@/components/Cascader/Cascader.types";
import { TSearchFilterMessages } from "@/components/Header/Header.types";
import Searchbar from "@/components/Searchbar";

import styles from "./SearchFilters.module.scss";
import { TFormValues } from "./SearchFilters.types";

interface IProps {
  initialValues: TFormValues;
  typeOptions: TOption[];
  messages: TSearchFilterMessages;
}

export default function SearchFilters({
  initialValues,
  typeOptions,
  messages,
}: IProps) {
  return (
    <Formik onSubmit={() => {}} initialValues={initialValues}>
      {({ setFieldValue, values, submitForm }) => (
        <Form className={styles.form}>
          <Searchbar searchPlaceholder={messages.search} />
          <Cascader
            value={values.type}
            placeholder={messages.type}
            onBlur={() => {
              submitForm();
            }}
            onChange={(v: (string | number)[]) => {
              setFieldValue("type", v[v.length - 1]);
            }}
            options={typeOptions}
          />
        </Form>
      )}
    </Formik>
  );
}
