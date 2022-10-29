import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { css } from "utils";

type Props = {
  url: string;
  src: string;
  width: number;
  height: number;
};

const NextImage: FC<Props> = ({ url, ...props }) => {
  return (
    <Link href={url} target="_blank">
      <Image
        style={{
          width: "100%",
          height: "auto",
          borderRadius: css("--radius-default"),
        }}
        {...props}
        alt=""
      />
    </Link>
  );
};

export default NextImage;
