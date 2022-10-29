import { rest, Rest } from "apis";
import useSWR from "swr";

export const useApi = <T extends keyof Rest>(
  api: T,
  ...params: Parameters<Rest[T]>
) => {
  return useSWR([api, ...params], async () => await rest[api](...params), {
    errorRetryCount: 1,
    dedupingInterval: 9999999,
    revalidateOnFocus: false,
    suspense: true,
  });
};
