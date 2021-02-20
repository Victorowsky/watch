import React, { useContext } from "react";
import { useState } from "react";
import QueueButton from "./QueueButton";
import Button from "../Button";
import { DataContext } from "../../App";
import "./AdminPanel.css";
import Queue from "./Queue";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

const AdminPanel = () => {
  const {
    twitchUserData,
    admin,
    setAdmin,
    setCurrentVideoLink,
    socket,
    setVideoQueue,
    videoQueue,
    setMaxDelay,
    maxDelay,
    // isAdminTaken,
  } = useContext(DataContext);
  const [editVideoLink, setEditVideoLink] = useState();

  let { twitchStreamer } = useParams();
  // DEFAULT VALUE IS MY CHANNEL
  if (twitchStreamer === undefined) {
    twitchStreamer = "victorowsky_";
  }

  useEffect(() => {
    if (twitchUserData) {
      if (twitchUserData.login.toLowerCase() === twitchStreamer.toLowerCase()) {
        console.log("SETTING ADMIN");
        if (!admin) {
          setAdmin(true);
        }
        // socket.emit("adminFromTwitchJoined", { currentRoom: twitchStreamer });
      }
      return () => {
        if (admin) {
          setAdmin(false);
        }
      };
    }
  }, [twitchUserData, setAdmin, twitchStreamer, admin]);

  useEffect(() => {
    if (admin) {
      socket.emit("adminQueueUpdate", {
        videoQueue,
        currentRoom: twitchStreamer,
      });

      return () => {
        socket.removeAllListeners("adminQueueUpdate");
      };
    }
  }, [videoQueue, socket, twitchStreamer, admin]);

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

  // const handleAdminRequest = () => {
  //   socket.emit("adminRequest", { currentRoom: twitchStreamer });
  // };

  // useEffect(() => {
  //   if (admin) {
  //     handleAdminRequest();
  //   }
  // }, [admin]);

  const handleChangeMaxDelay = (type) => {
    if (type === "increment") {
      setMaxDelay((prev) => prev + 1);
    } else if (type === "decrement") {
      setMaxDelay((prev) => {
        if (prev > 2) {
          return prev + -1;
        } else {
          return prev;
        }
      });
    }
  };

  // const handleLeaveAdmin = () => {
  //   const confirmAnswer = window.confirm(
  //     "Are you sure you don't want to be an admin?"
  //   );
  //   if (confirmAnswer) {
  //     setAdmin(false);
  //     socket.emit("adminLeave");
  //   }
  // };

  const handleAdminCheckQueue = () => {
    if (admin) {
      if (videoQueue) {
        setCurrentVideoLink(videoQueue[0]);
        setVideoQueue((prev) => prev.slice(1));
      }
    }
  };

  const handleTwitchLogin = () => {
    window.location.href =
      "https://boiling-bastion-80662.herokuapp.com/auth/twitch";
  };

  const handleLogout = () => {
    window.location.href =
      "https://boiling-bastion-80662.herokuapp.com/twitch/logout";
  };

  return (
    <>
      {admin ? (
        <>
          {/* ADDING VIDEO PANEL */}
          <div className="adminPanel">
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
                <Button text={"LOGOUT"} onClick={handleLogout} />
              </div>
            </form>
            {twitchUserData && (
              <div className="accountInfo">
                <div className="img">
                  <img src={twitchUserData.image} alt="twitchImage" srcset="" />
                </div>
                {twitchUserData.login}
              </div>
            )}
          </div>
          <Queue />
        </>
      ) : (
        <div className="delayInfoContainer">
          <Queue />
          <div className="delay">
            <span className="delayInfo">Max Delay: {maxDelay} seconds</span>
            <div className="delayManage">
              <div
                className="delayManageOptionDecrement"
                onClick={() => handleChangeMaxDelay("decrement")}
              >
                <RemoveIcon />
              </div>
              <div
                className="delayManageOptionIncrement"
                onClick={() => handleChangeMaxDelay("increment")}
              >
                <AddIcon />
              </div>
            </div>

            {twitchUserData ? (
              <div className="accountInfo">
                <div className="img">
                  <img src={twitchUserData.image} alt="twitchImage" srcset="" />
                </div>
                {twitchUserData.login}
              </div>
            ) : (
              <>
                {/* <Button
                  text={"GET ADMIN"}
                  onClick={handleAdminRequest}
                  style={{ borderColor: "white", color: "white" }}
                /> */}
                <Button
                  text={"LOGIN WITH TWITCH"}
                  onClick={handleTwitchLogin}
                />
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;
