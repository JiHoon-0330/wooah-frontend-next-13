export type WeverseMemberId =
  | "287797a9070d1c7b9276b68aa2aae940"
  | "ce731ac8ed27380b2a1c134ab0f16928"
  | "1a0790fc97ab2226299e0be040d37131"
  | "406ce8cdf0321afb462da0f782e9c15e"
  | "578c28ecd0cd9a2d20c8c0badaa09e23";

export type WeverseProfileType = "ARTIST" | "FAN";

export type WeverseAuthor<T extends WeverseProfileType> = T extends "ARTIST"
  ? {
      memberId: WeverseMemberId;
      profileName: string;
      profileType: "ARTIST";
    }
  : {
      memberId: string;
      profileName: string;
      profileType: "FAN";
    };

export type WeverseComment = {
  commentId: string;
  postId?: string;
  body: string;
  createdAt: string | number;
  author: WeverseAuthor<WeverseProfileType>;
  translated?: string | null;
};

type GetWeverse = {
  data: {
    postId: string;
    body: string;
    createdAt: string;
    author: WeverseAuthor<WeverseProfileType>;
    locked: boolean;
    photo?: { width: number; height: number; url: string }[];
    video?: string | null;
    translated?: string | null;
    comments: [WeverseComment, WeverseComment[]][];
  }[];
  lastId: string;
  hasMore: boolean;
};

export type WeverseApis = {
  getWeverse(from?: string): Promise<GetWeverse>;
};
