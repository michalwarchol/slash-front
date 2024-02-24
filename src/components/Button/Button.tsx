import { Button as AntdButton } from "antd";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "primary" | "dashed" | "link" | "text";
}

export default function Button({
  children,
  onClick,
  type,
  variant = "primary",
}: IProps) {
  return (
    <AntdButton type={variant} onClick={onClick} htmlType={type}>
      {children}
    </AntdButton>
  );
}
