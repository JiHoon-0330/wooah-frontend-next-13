import { Rest } from "apis";
import Body from "components/body";
import Card from "components/card";
import CreateAt from "components/create-at";
import Flex from "components/flex";
import FlexColumn from "components/flex/column";
import NextImage from "components/next-image";
import ProfileName from "components/profile-name";
import Video from "components/video";
import Link from "next/link";
import { FC, memo, useCallback } from "react";
import { classNames, css } from "utils";
import styles from "./twitter.module.css";

const cn = classNames(styles);

const parseLink = (href: string, display: string) => {
  return `<a href="${href}" target="_blank" class="${cn(
    "link",
    "hashtag",
  )}">${display}</a>`;
};

type Props = {
  data: Awaited<ReturnType<Rest["getTwitter"]>>["data"][0];
  observer?: Ref;
};

const Twitter: FC<Props> = ({ data, observer }) => {
  let formatted = false;
  const postLink = `https://twitter.com/${data.screen_name}/status/${data.sortIndex}`;

  const bodyFormatter = useCallback(() => {
    if (formatted) return data.full_text;

    formatted = true;

    if (data?.media?.length) {
      data.media.forEach(({ url }) => {
        data.full_text = data.full_text.replace(url, "");
      });
    }

    if (data.urls?.length) {
      data.urls.forEach(({ display_url, expanded_url, url }) => {
        data.full_text = data.full_text.replace(
          url,
          parseLink(url, display_url),
        );
      });
    }

    if (data?.user_mentions?.length) {
      data.user_mentions.forEach((user_mention, index) => {
        data.full_text = data.full_text.replace(
          `@${user_mention}`,
          `@${index}@`,
        );
      });

      data.user_mentions.forEach((user_mention, index) => {
        data.full_text = data.full_text.replace(
          `@${index}@`,
          parseLink(`https://twitter.com/${user_mention}`, `@${user_mention}`),
        );
      });
    }

    if (data.hashtags?.length) {
      data.hashtags.forEach((hashtag, index) => {
        data.full_text = data.full_text.replace(`#${hashtag}`, `#${index}#`);
      });

      data.hashtags.forEach((hashtag, index) => {
        data.full_text = data.full_text.replace(
          `#${index}#`,
          parseLink(
            `https://twitter.com/hashtag/${hashtag}?src=hashtag_click`,
            `#${hashtag}`,
          ),
        );
      });
    }

    return data.full_text;
  }, [data]);

  const colorByTag = () => {
    switch (true) {
      case /\[\#wa.*?\]/.test(data.full_text):
        return css("--WOOAH");

      case /\[\#나나.*?\]/.test(data.full_text):
        return css("--NANA");

      case /\[\#우연.*?\]/.test(data.full_text):
        return css("--WOOYEON");

      case /\[\#소라.*?\]/.test(data.full_text):
        return css("--SORA");

      case /\[\#루시.*?\]/.test(data.full_text):
        return css("--LUCY");

      case /\[\#민서.*?\]/.test(data.full_text):
        return css("--MINSEO");

      default:
        return css("--card-bg-default");
    }
  };

  return (
    <>
      <Card
        observer={observer}
        marginBottom={data?.quoted ? 0 : 40}
        backgroundColor={colorByTag()}
      >
        <FlexColumn gap={12}>
          <div>
            <Flex justifyContent={"space-between"}>
              <Link href={postLink} className={cn("link")}>
                <ProfileName name={data.name} fontWeight={700} />
              </Link>
              <CreateAt date={data.created_at} />
            </Flex>
            <div className={cn("screen-name")}>@{data.screen_name}</div>
          </div>
          <Body body={data.full_text} formatter={bodyFormatter} />
          <FlexColumn gap={6}>
            {!!data?.media?.length &&
              data.media?.map((item) => {
                if (item.type === "photo")
                  return (
                    <NextImage
                      key={item.url}
                      url={item.url}
                      src={item.src?.replace(
                        "https://pbs.twimg.com/",
                        "/twitter/image/",
                      )}
                      width={item?.width ?? 500}
                      height={item?.height ?? 500}
                    />
                  );
                return (
                  <Video
                    key={item.url}
                    src={item.src?.replace(
                      "https://video.twimg.com/",
                      "/twitter/video/",
                    )}
                    poster={item.poster}
                  />
                );
              })}
          </FlexColumn>
        </FlexColumn>
      </Card>
      {data?.quoted && <Twitter data={data.quoted} />}
    </>
  );
};

export default memo(
  Twitter,
  (prev, next) => prev.data.sortIndex === next.data.sortIndex,
);
