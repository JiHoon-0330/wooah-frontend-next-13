import { api } from "./create-api";
import { ReelsApi } from "./reels.type";

export const reelsApi: ReelsApi = {
  getReels(from) {
    return api({
      method: "GET",
      url: "/instagram/reels",
      params: {
        from,
      },
    });
  },
};
