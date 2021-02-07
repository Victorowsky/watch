import React, { useContext } from "react";
import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player/lazy";
import { DataContext } from "../App";
import "./PlayerAndChat.css";
import { useParams, useLocation } from "react-router-dom";
import Button from "./Button";

const PlayerAndChat = () => {
  let location = useLocation();
  let { twitchStreamer } = useParams();
  // DEFAULT VALUE IS MY CHANNEL
  if (twitchStreamer === undefined) {
    twitchStreamer = "victorowsky_";
  }

  const [currentRoom, setCurrentRoom] = useState(twitchStreamer);

  const {
    admin,
    setCurrentVideoLink,
    currentVideoLink,
    socket,
    onlineUsers,
    setAdmin,
    setIsSuccess,
    setIsError,
    setErrorMessage,
    setSuccessMessage,
  } = useContext(DataContext);

  const [isPlaying, setIsPlaying] = useState(false);
  const player = useRef();
  const maxDelay = 2;
  // const websiteURL = "victorowsky.github.io"; // FOR TWITCH CHAT
  const websiteURL = "localhost"; // FOR TWITCH CHAT

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
  }, [currentVideoLink, socket]);

  // DELETING ADMIN IF SWITCHING BETWEEN CHANNELS
  useEffect(() => {
    setCurrentRoom(twitchStreamer);
    socket.emit("adminLeave");
  }, [location.pathname]);

  // JOINING TO ROOM
  useEffect(() => {
    socket.emit(`joinRoom`, { currentRoom });
    return () => {
      socket.emit("leaveRoom", { currentRoom });
      setAdmin(false);
      socket.emit("adminLeave");
    };
  }, [currentRoom]);

  // SOCKETS LISTENERS FOR USERS ONLY
  useEffect(() => {
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
      });

      // SYNC SECONDS WITH ADMIN
      socket.on(`adminDataAnswer`, ({ currentSeconds }) => {
        if (player.current) {
          const videoDuration = player.current.getDuration();
          const currentTime = player.current.getCurrentTime();
          // FOR LIVESTREAMS
          if (videoDuration > currentSeconds) {
            if (
              !(
                currentTime < currentSeconds + maxDelay &&
                currentTime > currentSeconds - maxDelay
              )
            ) {
              // MAX 2 SENONDS DIFFERENCE
              player.current.seekTo(currentSeconds, "seconds");
            }
          } else {
            // HERE IS LIVESTREAM VERSION
            if (
              !(
                currentTime < videoDuration + maxDelay &&
                currentTime > videoDuration - maxDelay
              )
            ) {
              player.current.seekTo(videoDuration, "seconds");
            }
          }
        }
      });

      return () => {
        socket.offAny();
      };
    }
  }, [currentRoom, admin]);

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
            {onlineUsers ? `${onlineUsers} ONLINE` : "CONNECTING"}
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
            <Button
              text={"GET ADMIN"}
              onClick={handleAdminRequest}
              style={{ borderColor: "white", color: "white" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerAndChat;
