import { CSSProperties } from "react";
import { classNames } from "utils";
import styles from "./style.module.css";

const cn = classNames(styles);

type DateStringFormatter = (value: number) => string;

const dateStringFormatter: DateStringFormatter = (value) =>
  `${value < 10 ? "0" : ""}${value}`;

type Formatter = <T extends Date | number | string>(date: T) => string;

const defaultFormatter: Formatter = (value) => {
  const createAt = new Date(value);
  const year = createAt.getFullYear();
  const month = dateStringFormatter(createAt.getMonth() + 1);
  const date = dateStringFormatter(createAt.getDate());
  const hours = dateStringFormatter(createAt.getHours());
  const minutes = dateStringFormatter(createAt.getMinutes());

  return `${year}.${month}.${date} ${hours}:${minutes}`;
};

type Props<T extends Date | number | string> = CSSProperties & {
  date: T;
  formatter?: Formatter;
};

const CreateAt = <T extends Date | number | string>({
  date,
  formatter,
  ...style
}: Props<T>) => {
  const formatted =
    formatter instanceof Function ? formatter(date) : defaultFormatter(date);

  return (
    <div style={style} className={cn("create-at")}>
      {formatted}
    </div>
  );
};

export default CreateAt;
