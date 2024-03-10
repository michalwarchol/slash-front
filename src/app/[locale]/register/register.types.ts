export type UserRoles = {
  name: string;
  value: string;
}[];

export type TMessages = {
  title: string;
  formTitle: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  submit: string;
  haveAccount: string;
  login: string;
};

export type TErrorParams = {
  passwordMin: number;
};

export type TErrorMessages = {
  email: string;
  required: string;
  password: string;
  confirmPasswordDoesNotMatch: string;
  min: string;
};

export type TApiErrorMessages = {
  default: string;
  emailExists: string;
};

export type TInitialValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "STUDENT" | "EDUCATOR" | null;
};
