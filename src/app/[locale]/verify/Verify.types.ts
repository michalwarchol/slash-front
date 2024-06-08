export type TFormValues = {
  code: string;
};

export type TMessages = {
  title: string;
  content: string;
  formTitle: string;
  code: string;
  submit: string;
  logout: string;
};

export type TErrorMessages = {
  required: string;
};

export type TApiErrorMessages = {
  default: string;
  required: string;
  invalid: string;
  expired: string;
};
