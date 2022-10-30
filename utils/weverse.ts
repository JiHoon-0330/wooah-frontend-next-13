import { WeverseMemberId } from "apis/weverse.type";
import { css } from "./style";

export const valueByMember =
  <T extends any>(
    nana: T,
    wooyeon: T,
    sora: T,
    lucy: T,
    minseo: T,
    defaultValue: T,
  ) =>
  (memberId: WeverseMemberId | Member): T => {
    switch (memberId) {
      case "나나":
      case "287797a9070d1c7b9276b68aa2aae940":
        return nana;

      case "우연":
      case "ce731ac8ed27380b2a1c134ab0f16928":
        return wooyeon;

      case "소라":
      case "1a0790fc97ab2226299e0be040d37131":
        return sora;

      case "루시":
      case "406ce8cdf0321afb462da0f782e9c15e":
        return lucy;

      case "민서":
      case "578c28ecd0cd9a2d20c8c0badaa09e23":
        return minseo;

      default:
        return defaultValue;
    }
  };

export const colorByMember = valueByMember(
  css("--NANA"),
  css("--WOOYEON"),
  css("--SORA"),
  css("--LUCY"),
  css("--MINSEO"),
  css("--card-bg-default"),
);

export const weverseImageUrlReplace = (url: string) =>
  `${url.replace(
    "https://weverse-phinf.pstatic.net/",
    "/weverse/image/",
  )}?type=w670`;
