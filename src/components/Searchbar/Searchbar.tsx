"use client";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";

import Input from "@/components/Input";

import styles from "./Searchbar.module.scss";

interface IProps {
  searchPlaceholder: string;
}

export default function Searchbar({ searchPlaceholder }: IProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const elementStyle = window.getComputedStyle(ref.current);

        if (elementStyle.display === "none") {
          setSearchOpen(true);
        }
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
  }, []);

  return (
    <div className={styles.searchbar}>
      {searchOpen && (
        <Input
          name="search"
          className={styles.input}
          placeholder={searchPlaceholder}
        />
      )}
      <div className={styles.iconWrapper} ref={ref}>
        <div className={styles.icon} onClick={() => setSearchOpen(!searchOpen)}>
          {searchOpen ? <CloseOutlined /> : <SearchOutlined />}
        </div>
      </div>
    </div>
  );
}
