import { api } from "./create-api";
import { WeverseApis } from "./weverse.type";

export const weverseApis: WeverseApis = {
  getWeverse(from) {
    return api({
      method: "GET",
      url: "/weverse",
      params: {
        from,
      },
    });
  },
};
