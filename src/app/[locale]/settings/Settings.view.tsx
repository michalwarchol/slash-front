import { UserOutlined } from "@ant-design/icons";
import { Avatar, Divider, GetProp, Image, UploadFile, UploadProps } from "antd";
import { Form, Formik } from "formik";
import { useState } from "react";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Upload from "@/components/Upload";

import styles from "./Settings.module.scss";
import { TErrorMessages, TFormValues, TMessages } from "./Settings.types";
import validationSchema from "./Settings.validation";

interface IProps {
  initialValues: TFormValues;
  loading: boolean;
  avatar: string | null;
  messages: TMessages;
  errorMessages: TErrorMessages;
  onSubmit: (values: TFormValues) => Promise<void>;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function SettingsView({
  avatar,
  loading,
  initialValues,
  messages,
  errorMessages,
  onSubmit,
}: IProps) {
  const [previewImage, setPreviewImage] = useState("");

  return (
    <div className={styles.contentContainer}>
      <div className={styles.contentContainerInner}>
        <div className={styles.contentWrapper}>
          <div className={styles.titleWrapper}>{messages.title}</div>
          <Divider type="horizontal" className={styles.divider} />
          <div className={styles.sectionTitleWrapper}>{messages.userData}</div>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema(errorMessages)}
          >
            {({ setFieldValue }) => (
              <Form className={styles.form}>
                <div className={styles.inputWrapper}>
                  <div className={styles.label}>{messages.email}</div>
                  <div className={styles.input}>
                    <Input name="email" placeholder={messages.email} disabled />
                  </div>
                </div>
                <div className={styles.inputWrapper}>
                  <div className={styles.label}>{messages.firstName}</div>
                  <div className={styles.input}>
                    <Input name="firstName" placeholder={messages.firstName} />
                  </div>
                </div>
                <div className={styles.inputWrapper}>
                  <div className={styles.label}>{messages.lastName}</div>
                  <div className={styles.input}>
                    <Input name="lastName" placeholder={messages.lastName} />
                  </div>
                </div>
                <div className={styles.inputWrapper}>
                  <div className={styles.label}>{messages.role}</div>
                  <div className={styles.input}>
                    <Input name="type" placeholder={messages.role} disabled />
                  </div>
                </div>
                <div className={styles.inputWrapper}>
                  <div className={styles.label}>
                    {(avatar || previewImage) && (
                      <Image
                        src={previewImage || avatar || ""}
                        className={styles.avatar}
                        preview={false}
                      />
                    )}
                    {!avatar && !previewImage && (
                      <Avatar
                        icon={
                          <UserOutlined className={styles.userIcon} size={20} />
                        }
                        className={styles.avatar}
                      />
                    )}
                  </div>
                  <div className={styles.input}>
                    <Upload
                      name="avatar"
                      accept="image/jpeg,image/png"
                      placeholder={messages.uploadProfilePic}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      handleChange={async (file: UploadFile<any> | null) => {
                        setFieldValue("avatar", file);

                        if (file && !file.url && !file.preview) {
                          file.preview = await getBase64(
                            file.originFileObj as FileType
                          );
                          setPreviewImage(file.url || (file.preview as string));
                        }

                        if (!file) {
                          setPreviewImage("");
                        }
                      }}
                    />
                    <p className={styles.fileSizeInfo}>
                      {messages.maxFileSize}
                    </p>
                  </div>
                </div>
                <div className={styles.buttons}>
                  <Button type="submit" loading={loading}>
                    {messages.submit}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          <Divider type="horizontal" className={styles.divider} />
          <div className={styles.sectionTitleWrapper}>{messages.password}</div>
        </div>
      </div>
    </div>
  );
}
