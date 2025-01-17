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
  htmlType?: "text" | "password" | "textarea";
  disabled?: boolean;
}

const component = {
  text: AntdInput,
  password: AntdInput.Password,
  textarea: AntdInput.TextArea,
};

function Input({
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  htmlType = "text",
  className,
  disabled = false,
}: IProps) {
  const Component = component[htmlType];

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
      autoComplete="on"
    />
  );
}

export default withFormField(Input);
