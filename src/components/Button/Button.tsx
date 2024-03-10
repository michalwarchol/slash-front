import { Button as AntdButton, Spin } from "antd";
import cls from "classnames";

import styles from "./Button.module.scss";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "default" | "primary" | "dashed" | "link" | "text";
  className?: string;
  loading?: boolean;
}

export default function Button({
  children,
  onClick,
  type,
  variant = "primary",
  loading = false,
  className,
}: IProps) {
  return (
    <AntdButton
      type={variant}
      onClick={onClick}
      htmlType={type}
      className={cls(className, {
        [styles.buttonDisabled]: loading,
      })}
      disabled={loading}
    >
      {loading ? <Spin /> : children}
    </AntdButton>
  );
}
