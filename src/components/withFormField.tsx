import { Field, FieldProps } from "formik";

import FormField from "./FormField";

export default function withFormField(
  WrappedComponent: React.ComponentType<any> // eslint-disable-line @typescript-eslint/no-explicit-any
) {
  const WithFormField = (
    props: any // eslint-disable-line @typescript-eslint/no-explicit-any
  ) => (
    <Field name={props.name}>
      {({ field, form }: FieldProps) => (
        <FormField {...props} field={field} form={form}>
          <WrappedComponent {...props} />
        </FormField>
      )}
    </Field>
  );

  return WithFormField;
}
