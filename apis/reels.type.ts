type GetReels = {
  data: {
    body: string;
    createdAt: number;
    poster: string;
    src: string;
  }[];
  max_id: string;
  more_available: boolean;
};

export type ReelsApis = {
  getReels(from?: string): Promise<GetReels>;
};
