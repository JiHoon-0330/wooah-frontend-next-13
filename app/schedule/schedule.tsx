import { Rest } from "apis";
import Card from "components/card";
import Flex from "components/flex";
import FlexColumn from "components/flex/column";
import { FC, memo } from "react";
import { colorByMember, css } from "utils";
import { getScheduleStatus } from "./schedule-list";

const CATEGORY_COLOR = {
  기타: "#676a76",
  "공연/행사": "#7d66a0",
  라디오: "#6ab4ae",
  방송: "#f1b94f",
  생일: "#e67873",
} as const;
const OPACITY = 75;
const DAY = ["일", "월", "화", "수", "목", "금", "토"] as const;

const numberFormat = (value: number) => {
  return value < 10 ? `0${value}` : value;
};

const getTime = (time: number) => {
  const newDate = new Date(time);
  const h = newDate.getHours();
  const m = newDate.getMinutes();
  return `${numberFormat(h)}:${numberFormat(m)}`;
};

const getFormattedDate = (time?: number) => {
  const newDate = time ? new Date(time) : new Date();
  const y = newDate.getFullYear();
  const m = newDate.getMonth() + 1;
  const d = newDate.getDate();
  const day = newDate.getDay();

  return {
    date: new Date(`${numberFormat(y)}-${numberFormat(m)}-${numberFormat(d)}`),
    y,
    m,
    d,
    day,
  };
};

const getDate = (time: number, status: string) => {
  const { date: nowDate } = getFormattedDate();
  const { date: newDate, y, m, d, day } = getFormattedDate(time);

  const DDay = Math.ceil(
    (newDate.getTime() - nowDate.getTime()) / (60 * 60 * 24 * 1000),
  );

  return `${
    status
      ? status + " "
      : `${DDay >= 0 ? (DDay === 0 ? "오늘 " : `D-${DDay} `) : ""}`
  }${numberFormat(y)}.${numberFormat(m)}.${numberFormat(d)} ${DAY[day]}요일`;
};

type Props = {
  data: Awaited<ReturnType<Rest["getSchedule"]>>[0];
};

const Schedule: FC<Props> = ({ data }) => {
  const status = getScheduleStatus(data.startTime, data.endTime);
  const date = getDate(data.startTime, status);
  const sTime = getTime(data.startTime);
  const eTime = data.endTime ? getTime(data.endTime) : null;
  const members = data?.description
    ? data?.description?.replace(/,/g, " ")?.split(" ")
    : [];

  return (
    <Card
      padding={7}
      marginBottom={20}
      borderRadius={css("--radius-default")}
      backgroundColor={css("--card-bg-light")}
    >
      <Card
        padding={13}
        borderRadius={css("--radius-default")}
        backgroundColor={`${CATEGORY_COLOR[data.category]}${OPACITY}`}
      >
        <FlexColumn gap={6}>
          <Flex fontSize={"medium"} fontWeight={700}>
            [{data.category}] {data.title}
          </Flex>
          <Flex fontSize={"small"} fontWeight={600}>{`${date} ${sTime} ~ ${
            eTime ?? ""
          }`}</Flex>
        </FlexColumn>
      </Card>
      {!!members?.length && (
        <Flex>
          {members?.map((member) => {
            return (
              <Card
                display={"inline-block"}
                padding={"4px 10px"}
                borderRadius={"5px"}
                fontSize={"small"}
                fontWeight={700}
                backgroundColor={colorByMember(member as any)}
              >
                {member}
              </Card>
            );
          })}
        </Flex>
      )}
    </Card>
  );
};

export default memo(
  Schedule,
  (prev, next) => prev.data.scheduleId === next.data.scheduleId,
);
