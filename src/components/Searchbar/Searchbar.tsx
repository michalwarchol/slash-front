"use client";
import { useFormikContext } from "formik";
import { useRef } from "react";

import Input from "@/components/Input";

import styles from "./Searchbar.module.scss";

interface IProps {
  searchPlaceholder: string;
}

export default function Searchbar({ searchPlaceholder }: IProps) {
  const { submitForm } = useFormikContext();
  const submitTimeout = useRef<NodeJS.Timeout | null>(null);

  return (
    <div className={styles.searchbar}>
      <Input
        name="search"
        className={styles.input}
        placeholder={searchPlaceholder}
        changeCallback={() => {
          if (submitTimeout.current) {
            clearTimeout(submitTimeout.current);
          }
          submitTimeout.current = setTimeout(() => {
            submitForm();
          }, 2000);
        }}
      />
    </div>
  );
}
