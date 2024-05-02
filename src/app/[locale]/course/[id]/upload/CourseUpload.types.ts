import { UploadFile } from "antd/es/upload";

export type TFormValues = {
  name: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  thumbnail: UploadFile<any> | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  video: UploadFile<any> | null;
};

export type TMessages = {
  title: string;
  name: string;
  description: string;
  thumbnail: string;
  video: string;
  uploadButton: string;
  submit: string;
  cancel: string;
};

export type TErrorMessages = {
  default: string;
  required: string;
};
