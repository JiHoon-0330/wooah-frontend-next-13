"use client";

import { useEffect } from "react";

export const useVh = () => {
  useEffect(() => {
    if (!window) return;

    const callback = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    callback();
    window.addEventListener("resize", callback);

    return () => {
      window.removeEventListener("resize", callback);
    };
  }, []);

  return null;
};
