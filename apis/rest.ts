import { twitterApi } from "./twitter";
import { weverseApis } from "./weverse";

export const rest = Object.assign({}, weverseApis, twitterApi);
export type Rest = typeof rest;
