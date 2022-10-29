import { rest } from "apis";
import {
  WeverseAuthor,
  WeverseComment,
  WeverseProfileType,
} from "apis/weverse.type";
import Body from "components/body";
import Card from "components/card";
import CreateAt from "components/create-at";
import Flex from "components/flex";
import FlexColumn from "components/flex/column";
import NextImage from "components/next-image";
import ProfileName from "components/profile-name";
import Video from "components/video";
import { CSSProperties, FC, memo } from "react";
import { colorByWeverseMemberId, css, weverseImageUrlReplace } from "utils";

const isArtist = (
  type: WeverseAuthor<WeverseProfileType>,
): type is WeverseAuthor<"ARTIST"> => type.profileType === "ARTIST";

type Props = {
  data: Awaited<ReturnType<typeof rest.getWeverse>>["data"][0] | WeverseComment;
};

const Weverse: FC<Props> = ({ data }) => {
  const style: CSSProperties = {
    backgroundColor: isArtist(data.author)
      ? colorByWeverseMemberId(data.author.memberId)
      : css("--card-bg-default"),
  };

  return (
    <>
      <Card {...style}>
        <FlexColumn gap={12}>
          <Flex justifyContent={"space-between"} alignContent={"baseline"}>
            <ProfileName
              fontWeight={isArtist(data.author) ? 700 : undefined}
              name={data.author.profileName}
            />
            <CreateAt date={+data.createdAt} />
          </Flex>
          <Body body={data.body} />
          {"video" in data && data?.video && (
            <Video poster={data?.photo?.[0]?.url!} src={data.video} />
          )}
          {"photo" in data &&
            (data?.video && data?.photo?.length === 1 ? null : (
              <FlexColumn gap={6}>
                {data?.photo?.map((image) => {
                  const src = weverseImageUrlReplace(image.url);

                  return <NextImage key={src} {...image} src={src} />;
                })}
              </FlexColumn>
            ))}
        </FlexColumn>
      </Card>
      {"comments" in data &&
        data?.comments?.map(([parent, childs], index) => {
          const isLast = index === data?.comments?.length - 1;

          return (
            <FlexColumn key={parent.commentId} marginBottom={isLast ? 0 : 20}>
              {<Weverse data={parent} />}
              {childs?.map((child) => {
                return <Weverse key={child.commentId} data={child} />;
              })}
            </FlexColumn>
          );
        })}
    </>
  );
};

export default memo(
  Weverse,
  (prev, next) => prev.data.postId === next.data.postId,
);
