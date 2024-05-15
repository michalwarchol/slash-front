export const baseInsert = (
  editor: HTMLDivElement | null,
  command: string,
  value?: string
) => {
  const selection = window.getSelection();
  if (!selection) return;
  if (selection.rangeCount === 0) return;
  if (!editor) return;

  const range = selection.getRangeAt(0);
  if (editor.contains(range.commonAncestorContainer)) {
    document.execCommand(command, false, value);
  }
};

export const advancedInsert = (
  editor: HTMLDivElement | null,
  style: "fontSize" | "fontFamily" | "color",
  value: string
) => {
  const selection = window.getSelection();
  if (!selection) return;
  if (selection.rangeCount === 0) return;
  if (!editor) return;

  const range = selection.getRangeAt(0);
  const selectedText = range.extractContents();
  const sizeWrapper = document.createElement("span");
  if (style === "color") {
    sizeWrapper.style[style] = value;
  } else {
    sizeWrapper.style[style] = value + "px";
  }
  sizeWrapper.append(selectedText);
  range.insertNode(sizeWrapper);

  sizeWrapper.parentNode?.normalize();
};

export const insertItalics = (editor: HTMLDivElement | null) =>
  baseInsert(editor, "italic");

export const insertBold = (editor: HTMLDivElement | null) =>
  baseInsert(editor, "bold");

export const insertUnderline = (editor: HTMLDivElement | null) =>
  baseInsert(editor, "underline");

export const insertLineThrough = (editor: HTMLDivElement | null) =>
  baseInsert(editor, "strikeThrough");

export const justifyFull = (editor: HTMLDivElement | null) =>
  baseInsert(editor, "justifyFull");

export const justifyCenter = (editor: HTMLDivElement | null) =>
  baseInsert(editor, "justifyCenter");

export const justifyLeft = (editor: HTMLDivElement | null) =>
  baseInsert(editor, "justifyLeft");

export const justifyRight = (editor: HTMLDivElement | null) =>
  baseInsert(editor, "justifyRight");

export const insertOrderedList = (editor: HTMLDivElement | null) =>
  baseInsert(editor, "insertOrderedList");

export const insertUnorderedList = (editor: HTMLDivElement | null) =>
  baseInsert(editor, "insertUnorderedList");

export const insertFontName = (editor: HTMLDivElement | null, font: string) =>
  advancedInsert(editor, "fontFamily", font);

export const insertFontSize = (editor: HTMLDivElement | null, size: string) =>
  advancedInsert(editor, "fontSize", size);

export const insertFontColor = (editor: HTMLDivElement | null, color: string) =>
  advancedInsert(editor, "color", color);
