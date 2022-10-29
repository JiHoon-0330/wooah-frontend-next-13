import { api } from "./create-api";
import { TwitterApi } from "./twitter.type";

export const twitterApi: TwitterApi = {
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
