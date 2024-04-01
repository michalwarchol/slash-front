"use client";

import { Modal as AntdModal } from "antd";
import { ReactNode } from "react";

interface IProps {
  open: boolean;
  title: string;
  confirmLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  content?: ReactNode;
}

export default function Modal({
  open,
  title,
  confirmLoading,
  onConfirm,
  onCancel,
  content,
}: IProps) {
  return (
    <AntdModal
      title={title}
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      confirmLoading={confirmLoading}
    >
      {content}
    </AntdModal>
  );
}
