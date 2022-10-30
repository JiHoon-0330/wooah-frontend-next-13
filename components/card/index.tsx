import { CSSProperties, FC, ReactNode } from "react";
import { classNames } from "utils";
import styles from "./card.module.css";

const cn = classNames(styles);

type Props = CSSProperties & {
  children: ReactNode;
  observer?: Ref;
};

const Card: FC<Props> = ({ children, observer, ...style }) => {
  return (
    <div ref={observer} style={style} className={cn("card")}>
      {children}
    </div>
  );
};

export default Card;
