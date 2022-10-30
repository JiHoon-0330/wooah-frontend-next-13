import { api } from "./create-api";
import { ScheduleApis } from "./schedule.type";

export const scheduleApis: ScheduleApis = {
  getSchedule() {
    return api({
      method: "GET",
      url: "/schedule",
    });
  },
};
