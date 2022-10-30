import { rest } from "apis";
import { FC, use } from "react";
import ReelsClient from "./client";
import ReelsList from "./reels-list";

const Page: FC = () => {
  const { data, max_id } = use(rest.getReels());

  return (
    <>
      <ReelsList data={data} />

      <ReelsClient next={max_id} />
    </>
  );
};

export default Page;
