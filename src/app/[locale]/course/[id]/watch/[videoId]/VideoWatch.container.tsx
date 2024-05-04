"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { TVideoResponse } from "@/types/course";

import { getVideo } from "./VideoWatch.utils";
import View from "./VideoWatch.view";

interface IProps {
  id: string;
  locale: string;
  videoId: string;
  userId?: string;
}

export default function VideoWatchContainer({ videoId, locale }: IProps) {
  const [data, setData] = useState<TVideoResponse | null>(null);
  const { back } = useRouter();
  useEffect(() => {
    getVideo(videoId, locale).then((response) => {
      if (response === null) {
        back();
        return;
      }
      setData(response);
    });
  }, []);

  if (!data) {
    return null;
  }

  return <View data={data} />;
}
