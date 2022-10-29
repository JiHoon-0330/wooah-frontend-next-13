import { useCallback } from "react";

export const useObserver = (callback: Function) => {
  const ref: Ref = useCallback(
    (node: Element | null) => {
      if (!node) return;

      const io = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              callback();
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0,
        },
      );

      io.observe(node);
    },
    [callback],
  );

  return { ref };
};
