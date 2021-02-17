import React, { useContext } from "react";
import { useState } from "react";
import QueueButton from "./QueueButton";
import Button from "../Button";
import { DataContext } from "../../App";
import "./AdminPanel.css";
import Queue from "./Queue";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const AdminPanel = () => {
  const {
    admin,
    setAdmin,
    setCurrentVideoLink,
    socket,
    setVideoQueue,
    videoQueue,
  } = useContext(DataContext);
  const [editVideoLink, setEditVideoLink] = useState();

  let { twitchStreamer } = useParams();
  // DEFAULT VALUE IS MY CHANNEL
  if (twitchStreamer === undefined) {
    twitchStreamer = "victorowsky_";
  }

  useEffect(() => {
    socket.emit("adminQueueUpdate", {
      videoQueue,
      currentRoom: twitchStreamer,
    });

    return () => {
      socket.removeAllListeners("adminQueueUpdate");
    };
  }, [videoQueue, socket, twitchStreamer]);

  const handleAddVideoToQueue = () => {
    if (editVideoLink) {
      setVideoQueue((prev) => [...prev, editVideoLink]);
      setEditVideoLink("");
    }
  };

  const handleAddVideo = () => {
    if (editVideoLink) {
      setCurrentVideoLink(editVideoLink);
      setEditVideoLink("");
    }
  };

  const handleLeaveAdmin = () => {
    const confirmAnswer = window.confirm(
      "Are you sure you don't want to be an admin?"
    );
    if (confirmAnswer) {
      setAdmin(false);
      socket.emit("adminLeave");
    }
  };

  const handleAdminCheckQueue = () => {
    if (admin) {
      if (videoQueue) {
        setCurrentVideoLink(videoQueue[0]);
        setVideoQueue((prev) => prev.slice(1));
      }
    }
  };

  return (
    <>
      <br />
      {admin && (
        // ADDING VIDEO PANEL
        <form>
          <input
            type="text"
            value={editVideoLink}
            placeholder={"VIDEO URL"}
            onChange={(e) => {
              if (admin) {
                setEditVideoLink(e.target.value);
              }
            }}
          />

          <button
            style={{ display: "none" }}
            onClick={(e) => {
              e.preventDefault();
              handleAddVideo();
            }}
            type="submit"
          ></button>
          <div className="optionButtons">
            <QueueButton text={"PLAY NOW"} onClick={handleAddVideo} />
            <QueueButton
              text={"ADD TO QUEUE"}
              onClick={handleAddVideoToQueue}
            />
            <QueueButton text={"SKIP"} onClick={handleAdminCheckQueue} />
            <Button
              style={{ justifySelf: "flex-end" }}
              text={"LEAVE ADMIN"}
              onClick={handleLeaveAdmin}
            />
          </div>
        </form>
      )}
      <div className="adminButtonsDiv"></div>
      <Queue />
    </>
  );
};

export default AdminPanel;
