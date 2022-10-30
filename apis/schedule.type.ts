type GetSchedule = {
  scheduleId: number;
  title: string;
  startTime: number;
  endTime: number;
  description: string;
  category: "기타" | "공연/행사" | "라디오" | "방송" | "생일";
}[];

export type ScheduleApis = {
  getSchedule(): Promise<GetSchedule>;
};
