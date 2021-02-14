import React, { useState, useEffect } from "react";
const QueueItem = ({ item, index }) => {
  const [videoTitle, setVideoTitle] = useState();

  useEffect(() => {
    fetch(`https://noembed.com/embed?url=${item}`)
      .then((res) => res.json())
      .then((res) => {
        setVideoTitle(res.title);
      });
  }, [item]);

  return (
    <>
      <div className="queueItem">
        <a href={item} target="_blank" rel="noopener noreferrer">
          {index + 1}.{videoTitle ? videoTitle : item}
        </a>
      </div>
    </>
  );
};

export default QueueItem;
