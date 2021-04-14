import React, { useContext } from "react";
import { useState } from "react";
import QueueButton from "./QueueButton";
import Button2 from "../Button";
import { DataContext } from "../../App";
import "./AdminPanel.css";
import Queue from "./Queue";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { useRef } from "react";

const AdminPanel = () => {
	const {
		twitchUserData,
		websiteURL,
		admin,
		setAdmin,
		setCurrentVideoLink,
		socket,
		setVideoQueue,
		videoQueue,
		setMaxDelay,
		maxDelay,
		chatRef,
	} = useContext(DataContext);
	const [editVideoLink, setEditVideoLink] = useState();

	let { twitchStreamer } = useParams();

	if (twitchStreamer === undefined) {
		twitchStreamer = "victorowsky_";
	}
	twitchStreamer = twitchStreamer?.toLowerCase();
	// DEFAULT VALUE IS MY CHANNEL

	///  HANDLE SET WIDTH ON DELAY INFO SAME AS CHAT
	const delayInfoRef = useRef(null);

	useEffect(() => {
		const handleDelayInfoSetWidth = () => {
			delayInfoRef.current.style.width = chatRef?.current?.offsetWidth + "px";
		};
		window.addEventListener("resize", handleDelayInfoSetWidth);
		if (delayInfoRef.current) {
			handleDelayInfoSetWidth();
		}
		return () => {
			window.removeEventListener("resize", handleDelayInfoSetWidth);
		};
		// MADE FOR .current
		// eslint-disable-next-line
	}, [chatRef, delayInfoRef.current, twitchStreamer]);

	useEffect(() => {
		if (twitchUserData) {
			if (twitchUserData.login.toLowerCase() === twitchStreamer.toLowerCase()) {
				if (!admin) {
					setAdmin(true);
				}
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

	const handleAdminCheckQueue = () => {
		if (admin) {
			if (videoQueue) {
				setCurrentVideoLink(videoQueue[0]);
				setVideoQueue((prev) => prev.slice(1));
			}
		}
	};

	const handleTwitchLogin = () => {
		window.location.href = `${websiteURL}/auth/twitch`; //DECLARED IN APP
	};

	const handleLogout = () => {
		window.location.href = `${websiteURL}/twitch/logout`;
	};

	return (
		<>
			{admin ? (
				// ADMIN PANEL
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
								<Button2 text={"LOGOUT"} onClick={handleLogout} />
							</div>
						</form>
						{twitchUserData && (
							<div className="accountInfo">
								<div className="img">
									<img src={twitchUserData.image} alt="twitchImage" srcSet="" />
								</div>
								{twitchUserData.login}
							</div>
						)}
					</div>
					<Queue />
				</>
			) : (
				// IS NOT ADMIN
				<div className="delayInfoContainer">
					<Queue />
					<div className="delay" ref={delayInfoRef}>
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
								<a
									href={`${websiteURL}/#/${twitchUserData.login.toLowerCase()}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<div className="img">
										<img src={twitchUserData.image} alt="Profile" />
									</div>
									{twitchUserData.login}
								</a>
							</div>
						) : (
							<>
								<div className="twitchLoginButton">
									<Button2
										text={"LOGIN WITH TWITCH"}
										onClick={handleTwitchLogin}
									/>
								</div>
							</>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default AdminPanel;
