import { FC } from "react";

type Props = {
  poster: string;
  src: string;
};

const Video: FC<Props> = (props) => {
  return <video {...props} preload="none" controls playsInline loop />;
};

export default Video;
