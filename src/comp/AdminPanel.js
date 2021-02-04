import React, { useContext } from "react";
import { useState } from "react";
import ReactPlayer from "react-player/lazy";
import Button from "./Button";
import { DataContext } from "../App";
import "./AdminPanel.css";
import { useEffect } from "react";
import Cookies from "js-cookie";
const AdminPanel = () => {
  const {
    admin,
    setAdmin,
    setCurrentVideoLink,
    socket,
    setTwitchStreamerChat,
  } = useContext(DataContext);
  const [editVideoLink, setEditVideoLink] = useState();

  const handleAddVideo = () => {
    // if (ReactPlayer.canPlay(editVideoLink)) {
    setCurrentVideoLink(editVideoLink);
    // }
    setEditVideoLink("");
  };

  const handleLeaveAdmin = () => {
    const confirmAnswer = window.confirm(
      "Are you sure you don't want to be admin?"
    );
    if (confirmAnswer) {
      setAdmin((prev) => !prev);
      socket.emit("adminLeave");
    }
  };

  const handleChangeStreamersChat = () => {
    const newStreamerChat = prompt("Insert new twitch user:");
    if (newStreamerChat) {
      setTwitchStreamerChat(newStreamerChat);
      socket.emit("changeStreamersChat", newStreamerChat);
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
        </form>
      )}
      <div className="adminButtonsDiv">
        <Button
          text={"CHANGE STREAMER'S CHAT"}
          onClick={handleChangeStreamersChat}
        />
        <Button text={"LEAVE ADMIN"} onClick={handleLeaveAdmin} />
      </div>
    </>
  );
};

export default AdminPanel;
