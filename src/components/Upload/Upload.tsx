import { Upload as AntdUpload } from "antd";
import { UploadFile } from "antd/es/upload";

import Button from "../Button";
import withFormField from "../withFormField";

interface IProps {
  name: string;
  value: string;
  handleChange: (file: UploadFile<any> | null) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  error: object;
  accept?: string;
  className?: string;
  placeholder?: string;
  htmlType?: "text" | "password" | "textarea";
  disabled?: boolean;
}

function Upload({
  name,
  handleChange,
  placeholder,
  className,
  accept,
  disabled = false,
}: IProps) {
  return (
    <AntdUpload
      name={name}
      multiple={false}
      disabled={disabled}
      accept={accept}
      onChange={(info) => {
        if (info.file.status === "done") {
          handleChange(info.file);
        }
      }}
      onRemove={() => {
        handleChange(null);
      }}
    >
      <Button className={className} disabled={disabled}>
        {placeholder}
      </Button>
    </AntdUpload>
  );
}

export default withFormField(Upload);
