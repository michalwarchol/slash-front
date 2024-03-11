export type TMessages = {
  title: string;
  titleContentP1: string;
  titleContentP2: string;
  formTitle: string;
  email: string;
  password: string;
  dontHaveAccount: string;
  register: string;
  login: string;
};

export type TErrorMessages = {
  email: string;
  required: string;
};

export type TApiErrorMessages = {
  default: string;
  credentialsInvalid: string;
};

export type TInitialValues = {
  email: string;
  password: string;
};
