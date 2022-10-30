"use client";

import { useLocalStorage } from "hooks/swr/useLocalStorage";
import { usePathname } from "next/navigation";
import { ChangeEvent, FC, useEffect, useRef } from "react";

type Props = {
  poster: string;
  src: string;
};

const Video: FC<Props> = (props) => {
  const pathname = usePathname();
  const [volume, setVolume] = useLocalStorage(pathname.replace("/", ""));

  const videoRef = useRef<HTMLVideoElement>(null);

  const onVolumeChange = (e: ChangeEvent<HTMLVideoElement>) => {
    console.log("onVolumeChange: ", e.target.volume);
    setVolume(e.target.volume);
  };

  useEffect(() => {
    if (!videoRef.current) return;

    if (navigator.userAgent.includes("Mobile")) {
      videoRef.current.volume = 1;
    }
    videoRef.current.volume = volume ?? 0.5;
  }, [volume]);

  return (
    <video
      {...props}
      preload="none"
      controls
      playsInline
      loop
      onVolumeChange={onVolumeChange}
      ref={videoRef}
    />
  );
};

export default Video;
