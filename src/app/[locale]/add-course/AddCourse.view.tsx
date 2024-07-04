"use client";

import { Form, Formik } from "formik";
import { useEffect, useState } from "react";

import { useRouter } from "@/app/navigation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Wysiwyg from "@/components/Wysiwyg";
import Fetch from "@/utils/requestHandler";

import {
  CourseTypes,
  TErrorMessages,
  TInitialValues,
  TMessages,
} from "./AddCourse.types";
import AddCourseValidation from "./AddCourse.validation";
import styles from "./page.module.scss";

interface IProps {
  id?: string;
  initialValues: TInitialValues;
  courseTypes: CourseTypes;
  messages: TMessages;
  errorMessages: TErrorMessages;
}

export default function RegisterView({
  id,
  initialValues,
  courseTypes,
  messages,
  errorMessages,
}: IProps) {
  const { push, back } = useRouter();
  const [loading, setLoading] = useState(false);
  const [subTypes, setSubTypes] = useState<
    { id: string; name: string; value: string }[]
  >([]);

  useEffect(() => {
    const type = courseTypes.find(
      (courseType) => courseType.name === initialValues.type
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
  }, []);

  const onSubmit = async (values: TInitialValues) => {
    setLoading(true);

    const query = id ? "/courses/edit" : "/courses/create";
    const method = id ? Fetch.put : Fetch.post;
    const data = await method(query, {
      body: JSON.stringify({
        id,
        name: values.name,
        description: values.description,
        subTypeId: values.subType,
      }),
    });

    setLoading(false);

    if (data.success) {
      push(`/course/${data.result.id}`);
    }
  };

  const onCancel = () => {
    back();
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
                <div className={styles.inputWide}>
                  <Wysiwyg
                    name="description"
                    initialValue={initialValues.description}
                  />
                </div>
              </div>
              <div className={styles.buttons}>
                <Button type="submit" loading={loading}>
                  {messages.submit}
                </Button>
                <Button
                  type="button"
                  onClick={onCancel}
                  variant="text"
                  className={styles.cancelButton}
                >
                  {messages.cancel}
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
