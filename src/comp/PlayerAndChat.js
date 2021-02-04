import React, { useContext } from "react";
import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player/lazy";
import { DataContext } from "../App";
import "./PlayerAndChat.css";

const PlayerAndChat = () => {
  const {
    admin,
    setCurrentVideoLink,
    currentVideoLink,
    socket,
    onlineUsers,
    twitchStreamerChat,
    setTwitchStreamerChat,
  } = useContext(DataContext);

  const [isPlaying, setIsPlaying] = useState(false);

  const player = useRef();
  const maxDelay = 2;
  const websiteURL = "victorowsky.github.io"; // FOR TWITCH CHAT
  // const websiteURL = "localhost"; // FOR TWITCH CHAT

  // ADMIN EMITS HIS DATA TO SHARE WITH OTHERS
  useEffect(() => {
    let interval;
    if (admin) {
      interval = setInterval(() => {
        socket.emit("adminData", {
          currentSeconds: player.current.getCurrentTime(),
        });
      }, 3000);
    }
    return () => {
      clearInterval(interval);
      console.log("cleared interval");
    };
  }, [admin, socket]);

  // EMIT CHANGE VIDEO IF ADMIN CHANGES
  useEffect(() => {
    if (admin) {
      socket.emit("videoChange", currentVideoLink);
    }
  }, [currentVideoLink, admin, socket]);

  useEffect(() => {
    if (!currentVideoLink) {
      socket.emit("getAllData");
    }
  }, [socket, currentVideoLink]);

  socket.on(
    "getAllDataAnswer",
    ({ currentVideoLinkServer, isPlayingServer, twitchStreamerChatServer }) => {
      setCurrentVideoLink(currentVideoLinkServer);
      setIsPlaying(isPlayingServer);
      setTwitchStreamerChat(twitchStreamerChatServer);
    }
  );

  // SOCKETS LISTENERS FOR USERS ONLY
  if (!admin) {
    socket.on("changeStreamersChatAnswer", (twitchStreamerChatServer) => {
      setTwitchStreamerChat(twitchStreamerChatServer);
    });
    socket.on("videoChangeAnswer", (currentVideoLink) => {
      // TURNED OFF FOR ADMIN TO NOT LOOP PAGE
      setCurrentVideoLink(currentVideoLink);
    });
    socket.on("isPlayingSocketAnswer", (isPlaying) => {
      setIsPlaying(isPlaying);
    });

    // SYNC SECONDS WITH ADMIN
    socket.on("adminDataAnswer", ({ currentSeconds }) => {
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
  }

  const startSendingTimeToSocket = () => {
    // AVAILABLE ONLY FOR ADMIN
    if (admin) {
      setIsPlaying(true);
      socket.emit("isPlaying", { isPlaying: true });
    }
  };

  const stopSendingTimeToSocket = () => {
    // AVAILABLE ONLY FOR ADMIN
    if (admin) {
      setIsPlaying(false);
      socket.emit("isPlaying", { isPlaying: false });
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
            {onlineUsers ? `${onlineUsers} ONLINE` : "CONNECTING"}
          </span>
          <iframe
            style={{ border: "2px solid #121212" }}
            title="TwitchChat"
            id="chat_embed"
            src={`https://www.twitch.tv/embed/${twitchStreamerChat}/chat?darkpopout&parent=${websiteURL}`}
            height="100%"
            width="100%"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default PlayerAndChat;
