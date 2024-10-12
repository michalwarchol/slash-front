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
  remindPassword: string;
  remindPasswordSuccessPhaseOne: string;
  remindPasswordSuccessPhaseTwo: string;
};

export type TErrorMessages = {
  email: string;
  required: string;
};

export type TApiErrorMessages = {
  default: string;
  credentialsInvalid: string;
  invalid: string;
  expired: string;
};

export type TInitialValues = {
  email: string;
  password: string;
};

export type TRemindPasswordValues = {
  email: string;
  code: string;
  newPassword: string;
  confirmNewPassword: string;
};
