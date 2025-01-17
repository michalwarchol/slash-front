export type TParams = Promise<{
  id: string;
  videoId: string;
}>;

export type TFormValues = {
  name: string;
  description: string;
};

export type TMessages = {
  title: string;
  name: string;
  description: string;
  uploadButton: string;
  submit: string;
  cancel: string;
};

export type TErrorMessages = {
  default: string;
  required: string;
};
