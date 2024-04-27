"use client";

import { InboxOutlined } from "@ant-design/icons";
import { Modal as AntdModal, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import { useTranslations } from "next-intl";
import { useState } from "react";

const { Dragger } = Upload;

interface IProps {
  open: boolean;
  onConfirm: (file: RcFile | null) => void;
  onCancel: () => void;
  confirmLoading?: boolean;
}

export default function Modal({
  open,
  onCancel,
  onConfirm,
  confirmLoading,
}: IProps) {
  const t = useTranslations();
  const [file, setFile] = useState<RcFile | null>(null);

  return (
    <AntdModal
      open={open}
      onOk={() => {
        onConfirm(file);
        setFile(null);
      }}
      onCancel={onCancel}
      okButtonProps={{
        disabled: file === null,
      }}
      confirmLoading={confirmLoading}
    >
      <Dragger
        maxCount={1}
        showUploadList={false}
        beforeUpload={(file: RcFile) => {
          setFile(file);

          return false;
        }}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">{t("DropzoneModal.uploadText")}</p>
        <p className="ant-upload-hint">{t("DropzoneModal.uploadHint")}</p>
      </Dragger>
      <p>{file && file.name}</p>
    </AntdModal>
  );
}
