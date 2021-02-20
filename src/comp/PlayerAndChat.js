import React, { useContext } from "react";
import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player/lazy";
import { DataContext } from "../App";
import "./PlayerAndChat.css";
import { useParams, useLocation } from "react-router-dom";

const PlayerAndChat = () => {
  let location = useLocation();
  let { twitchStreamer } = useParams();
  twitchStreamer = twitchStreamer.toLowerCase();
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
    videoQueue,
    setVideoQueue,
    maxDelay,
    setIsAdminTaken,
  } = useContext(DataContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const player = useRef();
  const maxDelayLive = 6;
  // const websiteURL = "victorowsky.github.io"; // FOR TWITCH CHAT
  const websiteURL = "boiling-bastion-80662.herokuapp.com"; // HEROKU HOSTING
  // const websiteURL = "localhost"; // FOR TWITCH C  HAT

  // ADMIN EMITS HIS DATA TO SHARE WITH OTHERS
  useEffect(() => {
    let interval;
    if (admin) {
      interval = setInterval(() => {
        socket.emit(`adminData`, {
          currentRoom,
          currentSeconds: player.current.getCurrentTime(),
          videoQueue,
        });
      }, 3000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [admin, socket, currentRoom, videoQueue]);

  // EMIT CHANGE VIDEO IF ADMIN CHANGES
  useEffect(() => {
    if (admin) {
      socket.emit(`videoChange`, {
        currentVideoLink,
        currentRoom,
      });
    }
    // HERE CANT BE CURRENTROOM, CUZ IT WILL SEND ANOTHER ADMIN DATA
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
      socket.on(`adminDataAnswer`, ({ currentSeconds, videoQueue }) => {
        setVideoQueue(videoQueue);
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

      socket.on("adminQueueUpdateAnswer", ({ videoQueue }) => {
        setVideoQueue(videoQueue);
      });

      return () => {
        socket.removeAllListeners(`adminDataAnswer`);
        socket.removeAllListeners(`joinRoomAnswer`);
        socket.removeAllListeners(`isPlayingSocketAnswer`);
        socket.removeAllListeners(`videoChangeAnswer`);
        socket.removeAllListeners("adminAnswer");
        socket.removeAllListeners("adminRequestAnswer");
        socket.removeAllListeners("adminQueueUpdateAnswer");
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

  const handleAdminCheckQueue = () => {
    if (admin) {
      if (videoQueue) {
        setCurrentVideoLink(videoQueue[0]);
        setVideoQueue((prev) => prev.slice(1));
      }
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
            onEnded={handleAdminCheckQueue}
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
        </div>
      </div>
    </div>
  );
};

export default PlayerAndChat;
