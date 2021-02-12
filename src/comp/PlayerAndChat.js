import React, { useContext } from "react";
import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player/lazy";
import { DataContext } from "../App";
import "./PlayerAndChat.css";
import { useParams, useLocation } from "react-router-dom";
import Button from "./Button";
import PlusOneIcon from "@material-ui/icons/PlusOne";
import MinusOneIcon from "@material-ui/icons/ExposureNeg1";

const PlayerAndChat = () => {
  let location = useLocation();
  let { twitchStreamer } = useParams();
  // DEFAULT VALUE IS MY CHANNEL
  if (twitchStreamer === undefined) {
    twitchStreamer = "victorowsky_";
  }
  const [onlineUsers, setOnlineUsers] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(twitchStreamer);

  const {
    admin,
    setCurrentVideoLink,
    currentVideoLink,
    socket,
    setAdmin,
    setIsSuccess,
    setIsError,
    setErrorMessage,
    setSuccessMessage,
  } = useContext(DataContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const player = useRef();
  // const maxDelay = 2;
  const [maxDelay, setMaxDelay] = useState(2);
  const maxDelayLive = 6;
  const [isAdminTaken, setIsAdminTaken] = useState(true);
  const websiteURL = "victorowsky.github.io"; // FOR TWITCH CHAT
  // const websiteURL = "localhost"; // FOR TWITCH CHAT

  // ADMIN EMITS HIS DATA TO SHARE WITH OTHERS
  useEffect(() => {
    let interval;
    if (admin) {
      interval = setInterval(() => {
        socket.emit(`adminData`, {
          currentRoom,
          currentSeconds: player.current.getCurrentTime(),
        });
      }, 3000);
    }
    return () => {
      // socket.emit("adminLeave", { currentRoom });
      clearInterval(interval);
    };
  }, [admin, socket, currentRoom]);

  // EMIT CHANGE VIDEO IF ADMIN CHANGES
  useEffect(() => {
    if (admin) {
      socket.emit(`videoChange`, {
        currentVideoLink,
        currentRoom,
      });
    }
    // HERE CAN BE CURRENTROOM, CUZ I WILL SEND ANOTHER ADMIN DATA
    // eslint-disable-next-line
  }, [currentVideoLink, socket]);

  // DELETING ADMIN IF SWITCHING BETWEEN CHANNELS
  useEffect(() => {
    window.addEventListener("beforeunload", (ev) => {
      ev.preventDefault();
      socket.emit("leaveRoom", { currentRoom });
      socket.emit("adminLeave");
    });
    setCurrentRoom(twitchStreamer);
    // eslint-disable-next-line
  }, [location.pathname]);

  // JOINING TO ROOM
  useEffect(() => {
    socket.emit(`joinRoom`, { currentRoom });
    return () => {
      socket.emit("leaveRoom", { currentRoom });
      setAdmin(false);
      socket.emit("adminLeave");
    };
    // eslint-disable-next-line
  }, [currentRoom]);

  // SOCKETS LISTENERS FOR USERS ONLY
  useEffect(() => {
    socket.on("onlineUsersAnswer", ({ onlineUsers }) => {
      setOnlineUsers(onlineUsers);
    });

    if (!admin) {
      socket.on("videoChangeAnswer", ({ currentVideoLink }) => {
        // TURNED OFF FOR ADMIN TO NOT LOOP PAGE
        setCurrentVideoLink(currentVideoLink);
      });
      socket.on("isPlayingSocketAnswer", ({ isPlaying, currentRoom }) => {
        setIsPlaying(isPlaying);
      });

      socket.on("joinRoomAnswer", ({ docs }) => {
        setCurrentVideoLink(docs.currentVideoLink);
        setOnlineUsers(docs.onlineUsers);
        console.log(docs.admin);
        if (docs.admin) {
          setIsAdminTaken(true);
        } else {
          setIsAdminTaken(false);
        }
      });

      socket.on("adminAnswer", ({ isAdminTaken }) => {
        setIsAdminTaken(isAdminTaken);
      });

      // SYNC SECONDS WITH ADMIN
      socket.on(`adminDataAnswer`, ({ currentSeconds }) => {
        if (player.current) {
          const videoDuration = player.current.getDuration();
          const currentTime = player.current.getCurrentTime();
          // FOR LIVESTREAMS
          if (videoDuration > currentSeconds) {
            // STANDARD VIDEO
            if (
              !(
                currentTime - maxDelay < currentSeconds &&
                currentTime + maxDelay > currentSeconds
              )
            ) {
              // MAX 2 SENONDS DIFFERENCE
              player.current.seekTo(currentSeconds, "seconds");
            }
          } else {
            // HERE IS LIVESTREAM VERSION
            if (
              !(
                currentTime < videoDuration + maxDelayLive &&
                currentTime > videoDuration - maxDelayLive
              )
            ) {
              player.current.seekTo(videoDuration, "seconds");
            }
          }
        }
      });

      return () => {
        socket.removeAllListeners(`adminDataAnswer`);
        socket.removeAllListeners(`joinRoomAnswer`);
        socket.removeAllListeners(`isPlayingSocketAnswer`);
        socket.removeAllListeners(`videoChangeAnswer`);
        socket.removeAllListeners("adminAnswer");
      };
    }
    // eslint-disable-next-line
  }, [currentRoom, admin, socket, maxDelay]);

  const startSendingTimeToSocket = () => {
    // AVAILABLE ONLY FOR ADMIN
    if (admin) {
      setIsPlaying(true);
      socket.emit("isPlaying", {
        isPlaying: true,
        currentRoom,
      });
    }
  };

  const stopSendingTimeToSocket = () => {
    // AVAILABLE ONLY FOR ADMIN
    if (admin) {
      setIsPlaying(false);
      socket.emit("isPlaying", {
        isPlaying: false,
        currentRoom,
      });
    }
  };

  const handleAdminRequest = () => {
    socket.emit("adminRequest", { currentRoom: twitchStreamer });
  };

  socket.on("adminRequestAnswer", ({ success, message }) => {
    if (success) {
      setIsSuccess(true);
      setSuccessMessage(message);
      setAdmin(true);
    } else {
      setIsError(true);
      setErrorMessage(message);
    }
  });

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

  return (
    <div className="videoAndChat">
      <div className="playerAndChat">
        <div className="player-wrapper">
          <ReactPlayer
            ref={player}
            onPlay={startSendingTimeToSocket}
            onPause={stopSendingTimeToSocket}
            playing={isPlaying}
            className="react-player"
            url={currentVideoLink}
            width="100%"
            height="100%"
            controls={true}
            volume={0.1}
          />
        </div>
        <div className="twitchChat">
          <span className="onlineUsers">
            {onlineUsers !== null ? `${onlineUsers} ONLINE` : "CONNECTING"}
          </span>
          <iframe
            style={{ border: "2px solid #121212" }}
            title="TwitchChat"
            id="chat_embed"
            src={`https://www.twitch.tv/embed/${twitchStreamer}/chat?darkpopout&parent=${websiteURL}`}
            height="100%"
            width="100%"
          ></iframe>
          {!admin && (
            <>
              <span className="delayInfo">Max Delay: {maxDelay} seconds</span>
              <div className="delayManage">
                <div
                  className="delayManageOptionDecrement"
                  onClick={() => handleChangeMaxDelay("decrement")}
                >
                  <MinusOneIcon />
                </div>
                <div
                  className="delayManageOptionIncrement"
                  onClick={() => handleChangeMaxDelay("increment")}
                >
                  <PlusOneIcon />
                </div>
              </div>
              {!isAdminTaken && (
                <Button
                  text={"GET ADMIN"}
                  onClick={handleAdminRequest}
                  style={{ borderColor: "white", color: "white" }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerAndChat;
