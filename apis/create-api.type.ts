type ApiConfig = {
  baseURL?: string;
  url?: string;
  method?: "GET" | "POST";
  params?: { [K in string]: string | number | boolean | undefined };
};

export type CreateApi = (
  config?: ApiConfig,
) => <T>(config?: ApiConfig) => Promise<T>;
