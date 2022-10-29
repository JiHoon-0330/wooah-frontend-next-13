import { FC } from "react";
import { classNames } from "utils";
import "../styles/globals.css";
import styles from "./layout.module.css";
import { Layout } from "./layout.type";
import RootHeader from "./root-header";
import RootNav from "./root-nav";

const cn = classNames(styles);

const RootLayout: FC<Layout> = ({ children }) => {
  return (
    <html lang="ko">
      <head></head>
      <body className={cn("body")}>
        <RootHeader />
        <main className={cn("main")}>{children}</main>
        <RootNav />
      </body>
    </html>
  );
};
export default RootLayout;
