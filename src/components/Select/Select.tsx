import { Select as AntdSelect } from "antd";

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
  onBlur: () => void;
  error: object;
  options: ISelectOption[];
}

function Select({ name, value, error, onBlur, onChange, options }: IProps) {
  return (
    <AntdSelect
      className={styles.select}
      value={value}
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
