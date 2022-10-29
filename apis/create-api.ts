import { CreateApi } from "./create-api.type";

export const createApi: CreateApi = (defaultConfig) => {
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
    );
    return res.json();
  };
};
