"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, memo } from "react";

const RootNav: FC = () => {
  const sns: SNS[] = ["weverse", "twitter", "reels", "schedule"];

  const display: {
    [K in SNS]: string;
  } = {
    weverse: "위버스",
    twitter: "트위터",
    reels: "릴스",
    schedule: "스케쥴",
  };

  const pathname = usePathname();

  return (
    <nav
      style={{
        display: "flex",
        gap: 2,
      }}
    >
      {sns.map((sns) => {
        const link = `/${sns === "weverse" ? "" : sns}`;

        return (
          <Link
            key={sns}
            href={link}
            style={{
              position: "sticky",
              bottom: 0,
              flex: 1,
              textAlign: "center",
              padding: "6px 0",
              backgroundColor: link === pathname ? "#dee3e9" : "#d1d5db",
              fontSize: "small",
              fontWeight: 600,
            }}
          >
            {display[sns]}
          </Link>
        );
      })}
    </nav>
  );
};

export default memo(RootNav);
