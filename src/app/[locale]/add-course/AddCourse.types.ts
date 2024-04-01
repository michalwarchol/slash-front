export type CourseTypes = {
  id: string;
  name: string;
  value: string;
  subTypes: {
    id: string;
    name: string;
    value: string;
  }[];
}[];

export type TInitialValues = {
  id?: string;
  name: string;
  description: string;
  type: string | null;
  subType: string | null;
};

export type TMessages = {
  title: string;
  name: string;
  description: string;
  type: string;
  subType: string;
  submit: string;
  cancel: string;
};

export type TErrorMessages = {
  required: string;
};
