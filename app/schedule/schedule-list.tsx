"use client";

import { Rest } from "apis";
import { FC, useState } from "react";
import Schedule from "./schedule";

export const getScheduleStatus = (startTime: number, endTime: number) => {
  const nowDate = new Date().getTime();

  const isStart = nowDate - startTime >= 0;
  const isEnd = nowDate - (endTime || startTime + 1000 * 60 * 30) > 0;

  if (isEnd) return "종료";

  if (isStart) return "진행중";

  return "";
};

type Props = {
  data: Awaited<ReturnType<Rest["getSchedule"]>>;
};

const ScheduleList: FC<Props> = ({ data }) => {
  const [isShowPrev, setIsShowPrev] = useState(false);

  const prevList = data?.filter(({ startTime, endTime }) => {
    const status = getScheduleStatus(startTime, endTime);
    return status === "종료";
  });

  const nextList = data?.filter(({ startTime, endTime }) => {
    const status = getScheduleStatus(startTime, endTime);
    return status !== "종료";
  });

  if (!data?.length)
    return (
      <div
        style={{
          marginTop: "10px",
        }}
      >
        일정이 없습니다.
      </div>
    );

  return (
    <>
      {!!prevList?.length &&
        (isShowPrev ? (
          prevList.map((data) => {
            return <Schedule key={data.scheduleId} data={data} />;
          })
        ) : (
          <button
            style={{
              marginTop: "10px",
              cursor: "pointer",
              padding: "6px 10px",
              border: 0,
              borderRadius: "5px",
              fontSize: "small",
              fontWeight: 600,
            }}
            onClick={() => setIsShowPrev(true)}
          >
            이전
          </button>
        ))}

      {!!nextList?.length &&
        nextList.map((data) => {
          return <Schedule key={data.scheduleId} data={data} />;
        })}
    </>
  );
};

export default ScheduleList;
