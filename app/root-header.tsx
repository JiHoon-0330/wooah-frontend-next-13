import { FC, memo } from "react";
import { colorByMember } from "utils";

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
              position: "sticky",
              top: 0,
              flex: 1,
              textAlign: "center",
              padding: "2px 0",
              backgroundColor: colorByMember(member),
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
