import { CSSProperties, FC } from "react";
import { classNames } from "utils";
import styles from "./style.module.css";

const cn = classNames(styles);

type Props = CSSProperties & {
  name: string;
};

const ProfileName: FC<Props> = ({ name, ...style }) => {
  return (
    <div style={style} className={cn("profile-name")}>
      {name}
    </div>
  );
};

export default ProfileName;
