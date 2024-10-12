import { UploadFile } from "antd/es/upload";
import { Form, Formik } from "formik";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Upload from "@/components/Upload";

import styles from "./CourseUpload.module.scss";
import { TErrorMessages, TFormValues, TMessages } from "./CourseUpload.types";
import validationSchema from "./CourseUpload.validation";

interface IProps {
  isEdit?: boolean;
  messages: TMessages;
  errorMessages: TErrorMessages;
  loading: boolean;
  onSubmit: (values: TFormValues) => void;
  onCancel: () => void;
  initialValues: TFormValues;
}

export default function CourseUploadView({
  messages,
  errorMessages,
  loading,
  onSubmit,
  onCancel,
  initialValues,
  isEdit = false,
}: IProps) {
  return (
    <div className={styles.contentContainer}>
      <div className={styles.contentContainerInner}>
        <div className={styles.contentWrapper}>
          <div className={styles.titleWrapper}>{messages.title}</div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema(errorMessages, isEdit)}
          >
            {({ setFieldValue }) => (
              <Form className={styles.form}>
                <div className={styles.inputWrapper}>
                  <div className={styles.label}>{messages.name}</div>
                  <div className={styles.input}>
                    <Input name="name" placeholder={messages.name} />
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
                {!isEdit && (
                  <>
                    <div className={styles.inputWrapper}>
                      <div className={styles.label}>{messages.thumbnail}</div>
                      <div className={styles.input}>
                        <Upload
                          name="thumbnail"
                          accept="image/jpeg,image/png,image/webp"
                          placeholder={messages.uploadButton}
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          handleChange={(file: UploadFile<any> | null) => {
                            setFieldValue("thumbnail", file);
                          }}
                        />
                      </div>
                    </div>
                    <div className={styles.inputWrapper}>
                      <div className={styles.label}>{messages.video}</div>
                      <div className={styles.input}>
                        <Upload
                          name="video"
                          accept="video/mp4,video/mpeg,video/x-msvideo,video/ogg"
                          placeholder={messages.uploadButton}
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          handleChange={(file: UploadFile<any> | null) => {
                            setFieldValue("video", file);
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}
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
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
