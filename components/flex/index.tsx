import { CSSProperties, FC, ReactNode } from "react";
import { classNames } from "utils";
import styles from "./style.module.css";

const cn = classNames(styles);

type Props = Omit<CSSProperties, "display"> & {
  children: ReactNode;
};

const Flex: FC<Props> = ({ children, ...style }: Props) => {
  return (
    <div style={style} className={cn("flex")}>
      {children}
    </div>
  );
};
export default Flex;
