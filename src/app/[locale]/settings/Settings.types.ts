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
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type TErrorParams = {
  passwordMin: number;
};

export type TErrorMessages = {
  default : string;
  required: string;
  fileTooLarge: string;
  password: string;
  confirmPasswordDoesNotMatch: string;
  min: string;
};

export type TChangePasswordFormValues = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type TApiErrorMessages = {
  default: string;
  credentialsInvalid: string;
};
