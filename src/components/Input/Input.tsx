import { Input as AntdInput } from "antd";

import withFormField from "../withFormField";

interface IProps {
  name: string;
  value: string;
  onChange: () => void;
  onBlur: () => void;
  error: object;
  placeholder?: string;
  htmlType?: "text" | "password";
  disabled?: boolean;
}

function Input({
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  htmlType,
  disabled = false,
}: IProps) {
  const Component = htmlType === "password" ? AntdInput.Password : AntdInput;

  return (
    <Component
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      status={error ? "error" : undefined}
      style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}

export default withFormField(Input);
