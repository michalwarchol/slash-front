import { Select as AntdSelect } from "antd";
import { FocusEventHandler } from "react";

import withFormField from "../withFormField";
import styles from "./Select.module.scss";

interface ISelectOption {
  id: string;
  name: string;
  value?: string;
}

interface IProps {
  name: string;
  value: string;
  onChange: (value: { currentTarget: { name: string; value: string } }) => void;
  onFocus: FocusEventHandler<HTMLElement> | undefined;
  onBlur: () => void;
  error: object;
  options: ISelectOption[];
  placeholder?: string;
  disabled?: boolean;
}

function Select({
  name,
  value,
  error,
  onBlur,
  onFocus,
  onChange,
  options,
  placeholder,
  disabled = false,
}: IProps) {
  return (
    <AntdSelect
      rootClassName={styles.select}
      value={value}
      onFocus={onFocus}
      onChange={(newValue) =>
        onChange({
          currentTarget: {
            name,
            value: newValue,
          },
        })
      }
      onBlur={onBlur}
      status={error ? "error" : undefined}
      placeholder={placeholder}
      disabled={disabled}
    >
      {options.map((option) => (
        <AntdSelect.Option key={option.id} value={option.value || option.id}>
          {option.name}
        </AntdSelect.Option>
      ))}
    </AntdSelect>
  );
}

export default withFormField(Select);
