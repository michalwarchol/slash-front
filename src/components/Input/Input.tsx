import { Input as AntdInput } from "antd";

import withFormField from "../withFormField";

interface IProps {
  name: string;
  value: string;
  onChange: () => void;
  onBlur: () => void;
  error: object;
}

function Input({ name, value, onChange, onBlur, error }: IProps) {
  return (
    <AntdInput
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      status={error ? "error" : undefined}
    />
  );
}

export default withFormField(Input);
