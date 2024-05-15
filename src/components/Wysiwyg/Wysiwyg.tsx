"use client";

import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  MenuOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { ColorPicker } from "antd";
import { Color } from "antd/es/color-picker";
import cls from "classnames";
import { ErrorMessage, getIn, useFormikContext } from "formik";
import { useEffect, useRef, useState } from "react";

import Button from "@/components/Button";
import Select from "@/components/Select";
import isEmpty from "@/utils/isEmpty";

import { fontNameOptions, fontSizeOptions } from "./Wysiwyg.consts";
import styles from "./Wysiwyg.module.scss";
import {
  insertBold,
  insertFontColor,
  insertFontName,
  insertFontSize,
  insertItalics,
  insertLineThrough,
  insertOrderedList,
  insertUnderline,
  insertUnorderedList,
  justifyCenter,
  justifyFull,
  justifyLeft,
  justifyRight,
} from "./Wysiwyg.utils";

interface IProps {
  name: string;
  initialValue: string;
}

export default function Wysiwyg({ name, initialValue }: IProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [firstRender, setFirstRender] = useState(true);
  const [storedSelection, setStoredSelection] = useState<Range | null>(null);
  const [isColorOpen, setIsColorOpen] = useState(false);

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      setStoredSelection(selection.getRangeAt(0));
    }
  };

  const restoreSelection = () => {
    const selection = window.getSelection();
    if (selection && storedSelection) {
      selection.removeAllRanges();
      selection.addRange(storedSelection);
    }
  };

  const handleFocus = () => {
    restoreSelection();
  };

  const handleBlur = () => {
    saveSelection();
  };
  const { errors, submitCount, isSubmitting, setFieldValue } =
    useFormikContext<any>(); // eslint-disable-line @typescript-eslint/no-explicit-any
  const errorObj = errors[name] || getIn(errors, name);

  const isError = submitCount > 0 && errorObj;

  useEffect(() => {
    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function () {
        setFieldValue(name, editorRef.current?.innerHTML);
      });
    });
    if (editorRef.current) {
      editorRef.current.innerHTML = initialValue;
      observer.observe(editorRef.current, {
        childList: true,
        characterData: true,
        subtree: true,
        attributes: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  if (firstRender) {
    setFirstRender(false);
  }

  return (
    <div className={styles.wysiwyg}>
      <div className={styles.options}>
        <Button onClick={() => insertItalics(editorRef.current)} type="button">
          <i>i</i>
        </Button>
        <Button onClick={() => insertBold(editorRef.current)} type="button">
          <b>B</b>
        </Button>
        <Button
          onClick={() => insertUnderline(editorRef.current)}
          type="button"
        >
          <u>U</u>
        </Button>
        <Button
          onClick={() => insertLineThrough(editorRef.current)}
          type="button"
        >
          <span style={{ textDecoration: "line-through" }}>S</span>
        </Button>
        <Button onClick={() => justifyLeft(editorRef.current)} type="button">
          <AlignLeftOutlined />
        </Button>
        <Button onClick={() => justifyCenter(editorRef.current)} type="button">
          <AlignCenterOutlined />
        </Button>
        <Button onClick={() => justifyRight(editorRef.current)} type="button">
          <AlignRightOutlined />
        </Button>
        <Button onClick={() => justifyFull(editorRef.current)} type="button">
          <MenuOutlined />
        </Button>
        <Button
          onClick={() => insertOrderedList(editorRef.current)}
          type="button"
        >
          <OrderedListOutlined />
        </Button>
        <Button
          onClick={() => insertUnorderedList(editorRef.current)}
          type="button"
        >
          <UnorderedListOutlined />
        </Button>
      </div>
      <div className={styles.optionsSecondRow}>
        <div className={styles.selectWrapper}>
          <Select
            name="wysiwygFontName"
            options={fontNameOptions}
            changeCallback={(currentValue: string) => {
              restoreSelection();
              insertFontName(editorRef.current, currentValue);
            }}
          />
        </div>
        <div className={styles.selectWrapper}>
          <Select
            name="wysiwygFontSize"
            options={fontSizeOptions}
            changeCallback={(currentValue: string) => {
              restoreSelection();
              insertFontSize(editorRef.current, currentValue);
            }}
          />
        </div>
        <div
          onMouseDown={() => {
            if (!isColorOpen) {
              saveSelection();
              setIsColorOpen(true);
            }
          }}
        >
          <ColorPicker
            defaultValue="#000000"
            open={isColorOpen}
            onChangeComplete={(color: Color) => {
              restoreSelection();
              setIsColorOpen(false);
              insertFontColor(editorRef.current, color.toHexString());
            }}
          />
        </div>
      </div>
      <div
        contentEditable={!isSubmitting}
        ref={editorRef}
        className={cls(styles.edit, {
          [styles.editError]: isError,
        })}
        onFocus={handleFocus}
        onBlur={handleBlur}
      ></div>
      {!isEmpty(isError) && (
        <ErrorMessage
          component="div"
          name={name}
          className={styles.errorMessage}
        />
      )}
    </div>
  );
}
