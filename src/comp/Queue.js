import React, { useContext } from "react";
import { DataContext } from "../App";
import VideoInQueue from "./VideoInQueue";

const Queue = () => {
  const { videoQueue } = useContext(DataContext);

  const videoQueueMap = videoQueue.map((videoURL, index) => {
    return <VideoInQueue videoURL={videoURL} index={index} key={index} />;
  });
  return <>{videoQueueMap}</>;
};

export default Queue;
