import { FC, memo } from "react";
import { colorByWeverseMemberId } from "utils";

const RootHeader: FC = () => {
  const members: Member[] = ["나나", "우연", "소라", "루시", "민서"];

  return (
    <header
      style={{
        display: "flex",
      }}
    >
      {members.map((member) => {
        return (
          <div
            key={member}
            style={{
              flex: 1,
              textAlign: "center",
              padding: "2px 0",
              backgroundColor: colorByWeverseMemberId(member),
              fontSize: "small",
              fontWeight: 600,
            }}
          >
            {member}
          </div>
        );
      })}
    </header>
  );
};

export default memo(RootHeader);
