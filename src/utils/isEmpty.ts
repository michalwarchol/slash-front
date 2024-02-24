type Nullable<T> = T | null | undefined;

function isEmpty(value: Nullable<string | unknown[] | object>): boolean {
  if (value == null) {
    return true;
  }
  if (typeof value === "string" || Array.isArray(value)) {
    return !value.length;
  }
  if (typeof value === "object") {
    return !Object.keys(value).length;
  }
  return false;
}

export default isEmpty;
