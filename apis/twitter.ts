import { api } from "./create-api";
import { TwitterApis } from "./twitter.type";

export const twitterApis: TwitterApis = {
  getTwitter(from) {
    return api({
      method: "GET",
      url: "/twitter",
      params: {
        from,
      },
    });
  },
};
