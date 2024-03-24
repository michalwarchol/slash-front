import { Input as AntdInput } from "antd";

import withFormField from "../withFormField";

interface IProps {
  name: string;
  value: string;
  onChange: () => void;
  onBlur: () => void;
  error: object;
  className?: string;
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
  className,
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
      className={className}
    />
  );
}

export default withFormField(Input);
