import { Rest } from "apis";
import { parseLink } from "app/twitter/twitter";
import Body from "components/body";
import Card from "components/card";
import CreateAt from "components/create-at";
import Flex from "components/flex";
import FlexColumn from "components/flex/column";
import ProfileName from "components/profile-name";
import Video from "components/video";
import Link from "next/link";
import { FC, memo } from "react";
import { classNames, css } from "utils";
import styles from "./reels.module.css";

const cn = classNames(styles);

type Props = {
  data: Awaited<ReturnType<Rest["getReels"]>>["data"][0];
  observer?: Ref;
};

const formatter = (body: string) => {
  body = body.replace(/\#[^\s\#]+/g, (match) => {
    return parseLink(
      `https://www.instagram.com/explore/tags/${match.replace("#", "")}`,
      match,
    );
  });

  return body.replace(/@[^\s@]+/g, (match) => {
    return parseLink(
      `https://www.instagram.com/${match.replace("@", "")}`,
      match,
    );
  });
};

const Reels: FC<Props> = ({ data, observer }) => {
  return (
    <Card
      observer={observer}
      backgroundColor={css("--card-bg-default")}
      marginBottom={40}
    >
      <FlexColumn gap={12}>
        <Flex justifyContent={"space-between"}>
          <Link
            href="https://www.instagram.com/wooah_nv/"
            className={cn("link")}
          >
            <ProfileName name={"@wooah_nv"} />
          </Link>
          <CreateAt date={data.createdAt * 1000} />
        </Flex>
        <Video
          poster={data.poster?.replace(/.*\/v\//, "/instagram/image/v/")}
          src={`${
            process.env.NEXT_PUBLIC_API_BASE_URL
          }/instagram/video?url=${encodeURIComponent(data.src)}&createdAt=${
            data.createdAt
          }`}
        />
        <Body body={data.body} formatter={formatter} />
      </FlexColumn>
    </Card>
  );
};

export default memo(
  Reels,
  (prev, next) => prev.data.createdAt === next.data.createdAt,
);
