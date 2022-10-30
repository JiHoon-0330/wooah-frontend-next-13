import { reelsApi } from "./reels";
import { twitterApi } from "./twitter";
import { weverseApis } from "./weverse";

export const rest = Object.assign({}, weverseApis, twitterApi, reelsApi);
export type Rest = typeof rest;
