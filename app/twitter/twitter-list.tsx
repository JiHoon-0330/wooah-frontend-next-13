import { Rest } from "apis";
import { FC } from "react";
import Twitter from "./twitter";

type Props = {
  data: Awaited<ReturnType<Rest["getTwitter"]>>["data"];
  observer?: Ref;
};

const TwitterList: FC<Props> = ({ data, observer }) => {
  const prevList = new Set<string>([]);

  return (
    <>
      {!!data?.length &&
        data?.map((item, index) => {
          const isObserver = index === data?.length - 1;

          if (prevList.has(item.sortIndex)) {
            return isObserver ? (
              <div
                style={{
                  height: 1,
                }}
                key={`${item.sortIndex} ${index}`}
                ref={observer}
              />
            ) : null;
          }

          prevList.add(item.sortIndex);

          return (
            <Twitter
              observer={isObserver ? observer : undefined}
              key={item.sortIndex}
              data={item}
            />
          );
        })}
    </>
  );
};

export default TwitterList;
