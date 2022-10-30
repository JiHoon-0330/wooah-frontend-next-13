import { Rest } from "apis";
import { FC } from "react";
import Reels from "./reels";

type Props = {
  data: Awaited<ReturnType<Rest["getReels"]>>["data"];
  observer?: Ref;
};

const ReelsList: FC<Props> = ({ data, observer }) => {
  const prevList = new Set<number>([]);

  return (
    <>
      {!!data?.length &&
        data.map((item, index) => {
          const isObserver = index === data?.length - 1;

          if (prevList.has(item.createdAt)) {
            return isObserver ? (
              <div ref={observer} key={`${item.createdAt} ${index}`} />
            ) : null;
          }

          prevList.add(item.createdAt);

          return <Reels key={item.createdAt} data={item} observer={observer} />;
        })}
    </>
  );
};

export default ReelsList;
