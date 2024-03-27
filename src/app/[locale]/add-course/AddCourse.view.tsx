"use client";

import { Form, Formik } from "formik";
import { useState } from "react";

import { useRouter } from "@/app/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import axios from "@/utils/axios";

import {
  CourseTypes,
  TErrorMessages,
  TInitialValues,
  TMessages,
} from "./AddCourse.types";
import AddCourseValidation from "./AddCourse.validation";
import styles from "./page.module.scss";

interface IProps {
  initialValues: TInitialValues;
  courseTypes: CourseTypes;
  messages: TMessages;
  errorMessages: TErrorMessages;
}

export default function RegisterView({
  initialValues,
  courseTypes,
  messages,
  errorMessages,
}: IProps) {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [subTypes, setSubTypes] = useState<
    { id: string; name: string; value: string }[]
  >([]);

  const onSubmit = async (values: TInitialValues) => {
    setLoading(true);
    const { data } = await axios.post("courses/create", {
      name: values.name,
      description: values.description,
      subTypeId: values.subType,
    });

    setLoading(false);

    if (data.success) {
      push(`/course/${data.result.id}`);
    }
  };

  return (
    <div className={styles.contentContainer}>
      <div className={styles.contentContainerInner}>
        <div className={styles.contentWrapper}>
          <div className={styles.titleWrapper}>{messages.title}</div>
          <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={AddCourseValidation(errorMessages)}
          >
            <Form className={styles.form}>
              <div className={styles.inputWrapper}>
                <div className={styles.label}>{messages.name}</div>
                <div className={styles.input}>
                  <Input name="name" placeholder={messages.name} />
                </div>
              </div>
              <div className={styles.inputWrapper}>
                <div className={styles.label}>{messages.type}</div>
                <div className={styles.input}>
                  <Select
                    name="type"
                    placeholder={messages.type}
                    options={courseTypes.map((type) => ({
                      id: type.name,
                      name: type.value,
                    }))}
                    changeCallback={(
                      value: string,
                      setFieldValue: (
                        field: string,
                        value: string | null
                      ) => void
                    ) => {
                      const type = courseTypes.find(
                        (courseType) => courseType.name === value
                      );
                      if (!type) {
                        return;
                      }

                      const newSubTypes = type.subTypes.map((subType) => ({
                        id: subType.name,
                        name: subType.value,
                        value: subType.id,
                      }));

                      setSubTypes(newSubTypes);
                      setFieldValue("subType", null);
                    }}
                  />
                </div>
              </div>
              <div className={styles.inputWrapper}>
                <div className={styles.label}>{messages.subType}</div>
                <div className={styles.input}>
                  <Select
                    name="subType"
                    placeholder={messages.subType}
                    options={subTypes}
                  />
                </div>
              </div>
              <div className={styles.inputWrapper}>
                <div className={styles.label}>{messages.description}</div>
                <div className={styles.input}>
                  <Input
                    name="description"
                    htmlType="textarea"
                    placeholder={messages.description}
                  />
                </div>
              </div>
              <div className={styles.buttons}>
                <Button type="submit" loading={loading}>
                  {messages.submit}
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
