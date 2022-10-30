import { rest } from "apis";
import { FC, use } from "react";
import ScheduleList from "./schedule-list";

const Page: FC = () => {
  const data = use(rest.getSchedule());
  return <ScheduleList data={data} />;
};

export default Page;
