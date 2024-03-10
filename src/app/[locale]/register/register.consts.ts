import { TInitialValues } from "./register.types";

export const listItems = [
  {
    key: "videoCourses",
    text: "Register.videoCourses",
  },
  {
    key: "live",
    text: "Register.live",
  },
  {
    key: "exams",
    text: "Register.exams",
  },
  {
    key: "notes",
    text: "Register.notes",
  },
];

export const initialValues: TInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: null,
};
