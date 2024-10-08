"use client";

import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Form, Formik, FormikHelpers } from "formik";
import { useEffect, useRef, useState } from "react";

import { useRouter } from "@/app/navigation";
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
  const [searchOpen, setSearchOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onSubmit = (
    values: TFormValues,
    { setSubmitting }: FormikHelpers<TFormValues>
  ) => {
    let searchString = "";
    if (values.search !== "") {
      searchString += `search=${values.search}`;
    }

    if (values.type.length !== 0) {
      searchString += `&typeName=${values.type[1]}`;
    } else {
      searchString += `&typeName=`;
    }

    searchString += "&page=1";

    router.push("/search?" + searchString);
    setSubmitting(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const elementStyle = window.getComputedStyle(ref.current);

        if (elementStyle.display === "none") {
          setSearchOpen(true);
        }
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      {({ setFieldValue, values, submitForm }) => (
        <Form className={styles.form}>
          {searchOpen && (
            <>
              <Searchbar searchPlaceholder={messages.search} />
              <Cascader
                value={values.type}
                placeholder={messages.type}
                onBlur={() => {
                  submitForm();
                }}
                onChange={(v: (string | number)[]) => {
                  setFieldValue("type", v);
                }}
                options={typeOptions}
              />
            </>
          )}
          <div className={styles.iconWrapper} ref={ref}>
            <div
              className={styles.icon}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              {searchOpen ? <CloseOutlined /> : <SearchOutlined />}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
