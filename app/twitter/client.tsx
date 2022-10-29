"use client";

import { Rest } from "apis";
import Loading from "components/loading";
import { useApi, useObserver } from "hooks";
import { FC, useCallback, useEffect, useState } from "react";
import TwitterList from "./twitter-list";

type Props = {
  next: string;
};

const TwitterClient: FC<Props> = ({ next }) => {
  const [cursor, setCursor] = useState(next);
  const [list, setList] = useState<
    Awaited<ReturnType<Rest["getTwitter"]>>["data"]
  >([]);

  const { data } = useApi("getTwitter", cursor);

  const callback = useCallback(() => {
    if (data?.cursor) {
      setCursor(data.cursor);
    }
  }, [data]);
  const { ref } = useObserver(callback);

  useEffect(() => {
    if (!data?.data?.length) return;

    setList((prev) => prev.concat(data.data));
  }, [data]);

  return (
    <>
      {!!list?.length && <TwitterList data={list} observer={ref} />}
      <Loading />
    </>
  );
};

export default TwitterClient;
