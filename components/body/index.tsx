import { CSSProperties, FC } from "react";
import { classNames } from "utils";
import styles from "./style.module.css";

const cn = classNames(styles);

type Formatter = (value: string) => string;

type Props = CSSProperties & {
  body: string;
  formatter?: Formatter;
};

const Body: FC<Props> = ({ body, formatter, ...style }) => {
  const formattedBody = formatter instanceof Function ? formatter(body) : body;

  return (
    <div
      style={style}
      className={cn("body")}
      dangerouslySetInnerHTML={{
        __html: formattedBody,
      }}
    />
  );
};

export default Body;
