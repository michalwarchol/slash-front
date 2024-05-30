import { UploadFile } from "antd";

export type TFormValues = {
  email: string;
  firstName: string;
  lastName: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  avatar: UploadFile<any> | null;
}

export type TMessages = {
  title: string;
  userData: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  uploadProfilePic: string;
  maxFileSize: string;
  password: string;
  success: string;
  submit: string;
};

export type TErrorMessages = {
  default : string;
  required: string;
  fileTooLarge: string;
};
