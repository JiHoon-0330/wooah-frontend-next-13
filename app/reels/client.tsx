"use client";

import { Rest } from "apis";
import Loading from "components/loading";
import { useApi, useObserver } from "hooks";
import { FC, useCallback, useEffect, useState } from "react";
import ReelsList from "./reels-list";

type Props = {
  next: string;
};

const ReelsClient: FC<Props> = ({ next }) => {
  const [lastId, setLastId] = useState(next);
  const [list, setList] = useState<
    Awaited<ReturnType<Rest["getReels"]>>["data"]
  >([]);
  const { data } = useApi("getReels", lastId);

  const callback = useCallback(() => {
    if (data?.more_available) {
      setLastId(data.max_id);
    }
  }, [data]);
  const { ref } = useObserver(callback);

  useEffect(() => {
    if (!data?.data?.length) return;

    setList((prev) => prev.concat(data.data));
  }, [data]);

  return (
    <>
      {!!list?.length && <ReelsList data={list} observer={ref} />}
      <Loading />
    </>
  );
};

export default ReelsClient;
