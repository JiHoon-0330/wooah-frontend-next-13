import { api } from "./create-api";
import { ReelsApis } from "./reels.type";

export const reelsApis: ReelsApis = {
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
