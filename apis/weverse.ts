import { createApi } from "./create-api";
import { WeverseApis } from "./weverse.type";

const weverseApi = createApi({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const weverseApis: WeverseApis = {
  getWeverse(from) {
    return weverseApi({
      url: "/weverse",
      params: {
        from,
      },
    });
  },
};
