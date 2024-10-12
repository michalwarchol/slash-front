import { TInitialValues } from "./register.types";

export const listItems = [
  {
    key: "videoCourses",
    text: "Register.videoCourses",
  },
  {
    key: "live",
    text: "Register.personalization",
  },
  {
    key: "exams",
    text: "Register.materials",
  },
  {
    key: "notes",
    text: "Register.stats",
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
