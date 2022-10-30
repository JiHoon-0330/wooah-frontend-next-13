const RootProperty = {
  "--NANA": " #dbeafe",
  "--WOOYEON": " #ede9fe",
  "--SORA": " #fee2e2",
  "--LUCY": " #fce7f3",
  "--MINSEO": " #d1fae5",
  "--WOOAH": " #ffedd2",

  "--card-bg-light": " #f3f4f6",
  "--card-bg-default": " #e5e7eb",

  "--radius-default": " 10px",

  "--hashtag": " #1d98f0",

  "--vh": " 0",
};

export type RootProperty = typeof RootProperty;

type Css = {
  <T extends keyof RootProperty>(rootProperty: T, isValue?: boolean):
    | RootProperty[T]
    | `var(${T})`;
};

export const css: Css = (key, isValue = false) => {
  if (key === "--vh") return `var(${key})`;

  return isValue ? RootProperty[key] : `var(${key})`;
};
