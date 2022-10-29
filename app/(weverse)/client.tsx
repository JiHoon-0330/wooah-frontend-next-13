"use client";

import { Rest } from "apis";
import { useApi, useObserver } from "hooks";
import { FC, useCallback, useEffect, useState } from "react";
import WeverseList from "./weverse-list";

type Props = {
  next: string;
};

const WeverseClient: FC<Props> = ({ next }) => {
  const [lastId, setLastId] = useState(next);
  const [list, setList] = useState<
    Awaited<ReturnType<Rest["getWeverse"]>>["data"]
  >([]);

  const { data } = useApi("getWeverse", lastId);

  const callback = useCallback(() => {
    if (data?.hasMore) {
      setLastId(data?.lastId);
    }
  }, [data]);

  const { ref } = useObserver(callback);

  useEffect(() => {
    if (!data?.data?.length) return;

    setList((prev) => prev.concat(data.data));
  }, [data]);

  return <>{data && <WeverseList data={list} observer={ref} />}</>;
};

export default WeverseClient;
