import { CreateApi } from "./create-api.type";

const createApi: CreateApi = (defaultConfig) => {
  return async (config) => {
    if (typeof config?.params === "object") {
      config.url = `${config.url ?? ""}${Object.entries(config.params)
        .reduce((result, [key, value]) => {
          if (value) {
            return `${result}${key}=${value}&`;
          }
          return result;
        }, "?")
        .replace(/(\?|\&)$/, "")}`;
    }

    const res = await fetch(
      `${config?.baseURL ?? defaultConfig?.baseURL}${config?.url ?? ""}`,
      {
        next: {
          revalidate: 60,
        },
      },
    );

    return res.json();
  };
};

export const api = createApi({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});
