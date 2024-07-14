"use client";

import { Cascader as AntdCascader } from "antd";
import cls from "classnames";

import styles from "./Cascader.module.scss";
import { TOption } from "./Cascader.types";

interface IProps {
  value: string[];
  onChange: (v: (string | number)[]) => void;
  onBlur: () => void;
  options: TOption[];
  className?: string;
  placeholder?: string;
  disabled?: boolean;
}

function Cascader({
  value,
  onChange,
  onBlur,
  placeholder,
  className,
  disabled = false,
  options,
}: IProps) {
  return (
    <AntdCascader
      defaultValue={value}
      options={options}
      className={cls(styles.cascader, className)}
      placeholder={placeholder}
      disabled={disabled}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
}

export default Cascader;
