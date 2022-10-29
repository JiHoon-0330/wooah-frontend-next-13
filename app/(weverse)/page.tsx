import { rest } from "apis";
import { use } from "react";
import WeverseClient from "./client";
import WeverseList from "./weverse-list";

export const revalidate = 60;

const Page = () => {
  const { data, lastId } = use(rest.getWeverse());

  return (
    <>
      <WeverseList data={data} />

      <WeverseClient next={lastId} />
    </>
  );
};

export default Page;
