import React, { useEffect, useState } from "react";
import "./VideoInQueue.css";

const VideoInQueue = ({ videoURL, index }) => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`https://noembed.com/embed?url=${videoURL}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      });
  }, [videoURL]);
  return (
    <>
      {data && (
        <div className="videoInQueue">
          {/* <img src={data.thumbnail_url} alt="thumbnail" /> */}
          <a href={videoURL} target="_blank" rel="noopener noreferrer">
            {index + 1}. {data.title}
          </a>
        </div>
      )}
    </>
  );
};

export default VideoInQueue;
