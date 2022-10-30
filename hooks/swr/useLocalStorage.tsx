"use client";

import useSWR from "swr";

export const useLocalStorage = (key: string) => {
  const { data, mutate } = useSWR(`localStorage:${key}`, () => {
    if (!window) return;
    console.log("get: ", localStorage.getItem(key));
    return JSON.parse(localStorage.getItem(key) ?? "null");
  });

  const setLocalStorage = (value: any) => {
    console.log("setLocalStorage: ", value);
    localStorage.setItem(key, JSON.stringify(value));
    mutate();
  };

  return [data, setLocalStorage];
};
