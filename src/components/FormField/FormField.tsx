import { ErrorMessage, FieldInputProps, FormikProps, getIn } from "formik";
import React, {
  cloneElement,
  JSXElementConstructor,
  ReactElement,
  SyntheticEvent,
} from "react";

import isEmpty from "@/utils/isEmpty";

interface IProps {
  children: ReactElement<any, string | JSXElementConstructor<any>>; // eslint-disable-line @typescript-eslint/no-explicit-any
  field: FieldInputProps<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  form: FormikProps<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  label?: string;
  omitHelperText?: boolean;
  changeCallback?: (
    value: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    setFieldValue: (field: string, value: any) => void, // eslint-disable-line @typescript-eslint/no-explicit-any
    form: FormikProps<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  ) => void;
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export default function FormField({
  children,
  field,
  form,
  label,
  omitHelperText = false,
  changeCallback,
  props,
}: IProps) {
  const { name, onChange, onBlur, value } = field;
  const { touched, errors, submitCount, setFieldValue } = form;

  const isTouched = touched[name] || getIn(touched, name);
  const errorObj = errors[name] || getIn(errors, name);

  const isError = (isTouched || submitCount > 0) && errorObj;

  const newChildrenProps = {
    ...props,
    name,
    value,
    id: name,
    label,
    error: !!isError,
    onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
      onBlur(event);
    },
    onChange: (event: SyntheticEvent<HTMLInputElement>) => {
      onChange(event);

      if (changeCallback) {
        changeCallback(event.currentTarget.value, setFieldValue, form);
      }
    },
  };

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      {cloneElement(children, newChildrenProps)}
      {!isEmpty({ a: "a" }) && !omitHelperText && (
        <ErrorMessage component="div" name={name} />
      )}
    </div>
  );
}
