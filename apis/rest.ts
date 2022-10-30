import { reelsApis } from "./reels";
import { scheduleApis } from "./schedule";
import { twitterApis } from "./twitter";
import { weverseApis } from "./weverse";

export const rest = Object.assign(
  weverseApis,
  twitterApis,
  reelsApis,
  scheduleApis,
);
export type Rest = typeof rest;
