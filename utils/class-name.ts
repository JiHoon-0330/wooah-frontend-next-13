type ClassNames = (styles: {
  readonly [key: string]: string;
}) => (
  ...params: (string | { [k in string]: boolean })[]
) => string | undefined;

export const classNames: ClassNames =
  (styles) =>
  (...params) => {
    return params
      .map((param) => {
        if (typeof param === "string") {
          return styles?.[param.trim()] ?? "";
        }

        return Object.entries(param)
          .map(([key, value]) => {
            if (!value) return "";

            return styles?.[key.trim()] ?? "";
          })
          .join(" ");
      })
      .join(" ");
  };
