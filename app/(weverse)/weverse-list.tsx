import { Rest } from "apis";
import Card from "components/card";
import { FC } from "react";
import { css } from "utils";
import Weverse from "./weverse";

type Props = {
  data: Awaited<ReturnType<Rest["getWeverse"]>>["data"];
  observer?: Ref;
};

const WeverseList: FC<Props> = ({ data, observer }) => {
  const prevPostIdList = new Set<string>([]);

  return (
    <>
      {data.map((item, index) => {
        const isObserver = index === data?.length - 1;

        if (prevPostIdList.has(item.postId)) {
          return isObserver ? (
            <div
              style={{
                height: 1,
              }}
              ref={observer}
              key={`${item.postId}:${index}`}
            />
          ) : null;
        }

        prevPostIdList.add(item.postId);

        return (
          <Card
            observer={isObserver ? observer : undefined}
            key={item.postId}
            marginBottom={40}
            padding={7}
            backgroundColor={css("--card-bg-light")}
          >
            <Weverse data={item} />
          </Card>
        );
      })}
    </>
  );
};

export default WeverseList;
