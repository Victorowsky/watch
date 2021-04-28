import React, { useContext } from "react";
import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player/lazy";
import { DataContext } from "../App";
import "./PlayerAndChat.css";
import { useParams, useLocation } from "react-router-dom";

const PlayerAndChat = () => {
	let location = useLocation();
	let { twitchStreamer } = useParams();
	// DEFAULT VALUE IS MY CHANNEL
	if (twitchStreamer === undefined) {
		twitchStreamer = "victorowsky_";
	}

	twitchStreamer = twitchStreamer.toLowerCase();

	let chatUsername = twitchStreamer;

	if (chatUsername === "szkajpur") {
		chatUsername = "demonzz1";
	}

	const [onlineUsers, setOnlineUsers] = useState(null);
	const [currentRoom, setCurrentRoom] = useState(twitchStreamer);
	const {
		admin,
		setCurrentVideoLink,
		currentVideoLink,
		socket,
		setAdmin,
		videoQueue,
		setVideoQueue,
		maxDelay,
		chatRef,
	} = useContext(DataContext);

	const [isPlaying, setIsPlaying] = useState(false);
	const player = useRef();
	const maxDelayLive = 6;
	// CHAT LINK
	const websiteURL = window.location.host; // HEROKU HOSTING

	const synchronizeVideo = (player, currentSeconds) => {
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
	};

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
		};
		// eslint-disable-next-line
	}, [currentRoom]);

	// SOCKETS LISTENERS FOR USERS ONLY
	useEffect(() => {
		socket.on("onlineUsersAnswer", ({ onlineUsers }) => {
			setOnlineUsers(onlineUsers);
		});

		socket.on("joinRoomAnswer", ({ docs }) => {
			setCurrentVideoLink(docs.currentVideoLink);
		});

		if (!admin) {
			socket.on("videoChangeAnswer", ({ currentVideoLink }) => {
				// TURNED OFF FOR ADMIN TO NOT LOOP PAGE
				setCurrentVideoLink(currentVideoLink);
			});
			socket.on("isPlayingSocketAnswer", ({ isPlaying }) => {
				setIsPlaying(isPlaying);
			});

			// SYNC SECONDS WITH ADMIN
			socket.on(`adminDataAnswer`, ({ currentSeconds, videoQueue }) => {
				setVideoQueue(videoQueue);
				synchronizeVideo(player, currentSeconds);
			});

			socket.on("adminQueueUpdateAnswer", ({ videoQueue }) => {
				setVideoQueue(videoQueue);
			});
		}
		return () => {
			socket.removeAllListeners(`adminDataAnswer`);
			socket.removeAllListeners(`joinRoomAnswer`);
			socket.removeAllListeners(`isPlayingSocketAnswer`);
			socket.removeAllListeners(`videoChangeAnswer`);
			socket.removeAllListeners("adminQueueUpdateAnswer");
			socket.removeAllListeners("onlineUsersAnswer");
		};
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
				<div className="twitchChat" ref={chatRef}>
					<span className="onlineUsers">
						{onlineUsers ? `${onlineUsers} ONLINE` : "CONNECTING"}
					</span>
					<iframe
						style={{ border: "2px solid #121212" }}
						title="TwitchChat"
						id="chat_embed"
						src={`https://www.twitch.tv/embed/${chatUsername}/chat?darkpopout&parent=${websiteURL}`}
						height="100%"
						width="100%"
					></iframe>
				</div>
			</div>
		</div>
	);
};

export default PlayerAndChat;
