import { rest } from "apis";
import { FC, use } from "react";
import TwitterClient from "./client";
import TwitterList from "./twitter-list";

export const revalidate = 60;

const Page: FC = () => {
  const { data, cursor } = use(rest.getTwitter());

  return (
    <>
      <TwitterList data={data} />

      <TwitterClient next={cursor} />
    </>
  );
};

export default Page;
