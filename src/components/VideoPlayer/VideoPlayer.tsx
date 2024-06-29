"use client";

import {
  CaretRightOutlined,
  MutedOutlined,
  PauseOutlined,
  RedoOutlined,
  SoundOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";
import cls from "classnames";
import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import variables from "@/app/colors.module.scss";
import { useRouter } from "@/app/navigation";
import durationToPercentage from "@/utils/durationToPercentage";
import { secondsToTime } from "@/utils/timeUtils";

import styles from "./VideoPlayer.module.scss";
import { getProgressSliderBackgroundColor } from "./VideoPlayer.utils";

interface IProps {
  src: string;
  thumbnail: string;
  duration: number;
  courseId: string;
  previousVideoId: string | null;
  nextVideoId: string | null;
  defaultTime: number;
  timeUpdateCallback?: (e: SyntheticEvent<HTMLVideoElement>) => void;
  onAddEditProgress: (watchTime: number) => Promise<void>;
}

function VideoPlayer({
  src,
  thumbnail,
  duration,
  courseId,
  previousVideoId,
  nextVideoId,
  timeUpdateCallback,
  onAddEditProgress,
  defaultTime = 0,
}: IProps) {
  const { push } = useRouter();
  const [currentTime, setCurrentTime] = useState(defaultTime);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(true);
  const [volume, setVolume] = useState(100);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLInputElement>(null);
  const hideControlsTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  const updateProgressInterval = useRef<NodeJS.Timeout | undefined>(undefined);

  const play = () => {
    videoRef.current?.play();
    setPaused(false);
  };

  const pause = () => {
    videoRef.current?.pause();
    setPaused(true);
  };

  const mute = () => {
    setMuted(true);
  };

  const unmute = () => {
    setMuted(false);
  };

  const showControls = () => {
    clearTimeout(hideControlsTimeout.current);
    setControlsVisible(true);
    hideControlsTimeout.current = setTimeout(() => {
      setControlsVisible(false);
    }, 4000);
  };

  const hideControls = () => {
    setControlsVisible(false);
  };

  const onTimeUpdate = (e: SyntheticEvent<HTMLVideoElement>) => {
    if (timeUpdateCallback) {
      timeUpdateCallback(e);
    }

    if (e.currentTarget.currentTime > duration) {
      setCurrentTime(duration);
      setPaused(true);
    } else {
      setCurrentTime(e.currentTarget.currentTime);
    }

    if (progressRef.current) {
      if (e.currentTarget.currentTime > duration) {
        progressRef.current.value = "100";
        progressRef.current.style.background = getProgressSliderBackgroundColor(
          variables.primary,
          "100"
        );
      } else {
        const value = durationToPercentage(
          duration,
          e.currentTarget.currentTime
        ).toString();
        progressRef.current.value = value.toString();
        progressRef.current.style.background = getProgressSliderBackgroundColor(
          variables.primary,
          value.toString()
        );
      }
    }
  };

  const onVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const value = parseInt(e.currentTarget.value) / 100;
      videoRef.current.volume = value;
      setVolume(value);
    }
  };

  const onProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const time = (parseInt(e.currentTarget.value) / 100) * duration;
      videoRef.current.currentTime = time;
      if (progressRef.current) {
        progressRef.current.style.background = getProgressSliderBackgroundColor(
          variables.primary,
          e.currentTarget.value
        );
      }
    }
  };

  const onPreviousVideoClick = () => {
    if (previousVideoId === null) {
      return;
    }

    push(`/course/${courseId}/watch/${previousVideoId}`);
  };

  const onNextVideoClick = () => {
    if (nextVideoId === null) {
      return;
    }

    push(`/course/${courseId}/watch/${nextVideoId}`);
  };

  useEffect(() => {
    if (paused) {
      clearInterval(updateProgressInterval.current);
    } else {
      updateProgressInterval.current = setInterval(() => {
        if (videoRef.current) {
          onAddEditProgress(Math.floor(videoRef.current.currentTime));
        }
      }, 60000); // update once a minute
    }

    return () => {
      clearTimeout(updateProgressInterval.current);
    };
  }, [paused]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = defaultTime;
    }
  }, []);

  return (
    <div
      className={styles.videoWrapper}
      onMouseMove={showControls}
      onMouseLeave={hideControls}
    >
      <video
        poster={thumbnail}
        src={src}
        controls={false}
        muted={muted}
        ref={videoRef}
        onTimeUpdate={onTimeUpdate}
        onEnded={() => {
          setPaused(true);
          onAddEditProgress(duration);
        }}
      />
      <div
        className={styles.controls}
        style={{ opacity: controlsVisible ? 1 : 0 }}
      >
        <div className={styles.timelineWrapper}>
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            defaultValue={0}
            className={styles.progressSlider}
            onInput={onProgressChange}
            ref={progressRef}
          />
        </div>
        <div className={styles.buttons}>
          <div
            className={cls(styles.button, {
              [styles.buttonDisabled]: previousVideoId === null,
            })}
            onClick={onPreviousVideoClick}
          >
            <StepBackwardOutlined className={styles.icon} />
          </div>
          {paused ? (
            <div className={styles.button} onClick={play}>
              {currentTime === duration ? (
                <RedoOutlined className={styles.icon} />
              ) : (
                <CaretRightOutlined className={styles.icon} />
              )}
            </div>
          ) : (
            <div className={styles.button} onClick={pause}>
              <PauseOutlined className={styles.icon} />
            </div>
          )}
          <div
            className={cls(styles.button, {
              [styles.buttonDisabled]: nextVideoId === null,
            })}
            onClick={onNextVideoClick}
          >
            <StepForwardOutlined className={styles.icon} />
          </div>
          {muted ? (
            <div className={styles.button} onClick={unmute}>
              <MutedOutlined className={styles.icon} />
            </div>
          ) : (
            <div className={styles.button} onClick={mute}>
              <SoundOutlined className={styles.icon} />
            </div>
          )}
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            defaultValue={volume}
            className={styles.volumeSlider}
            onChange={onVolumeChange}
          />
          <div className={styles.time}>{`${secondsToTime(
            parseInt(currentTime.toString())
          )} / ${secondsToTime(duration)}`}</div>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
