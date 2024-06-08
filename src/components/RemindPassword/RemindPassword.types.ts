export type TFormValues = {
  email: string;
  code: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type TErrorParams = {
  passwordMin: number;
}

export type TErrorMessages = {
  email: string;
  required: string;
  min: string;
  password: string;
  confirmPasswordDoesNotMatch: string;
}
