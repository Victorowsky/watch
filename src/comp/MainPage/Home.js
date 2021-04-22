import React, { useState } from "react";
import "./Home.css";
import { useHistory } from "react-router-dom";
import { DataContext } from "../../App";
import { useContext } from "react";

const Home = () => {
	const { twitchUserData, websiteURL } = useContext(DataContext);

	const history = useHistory();

	const [twitchStreamer, setTwitchStreamer] = useState("");
	const goToChannel = (e) => {
		e.preventDefault();
		if (twitchStreamer) {
			history.push(`/${twitchStreamer}`);
		}
	};

	const handleTwitchLogin = () => {
		window.location.href = `${websiteURL}/auth/twitch`;
	};

	return (
		<div className="home">
			<h1> Twitch Together</h1>
			<h2>Enter twitch streamer username</h2>
			<form>
				<input
					placeholder="Channel"
					type="text"
					value={twitchStreamer}
					onChange={(e) => setTwitchStreamer(e.target.value)}
				/>
				<button
					type="submit"
					style={{ display: "none" }}
					onClick={goToChannel}
				></button>
				{twitchUserData ? (
					<div className="userInfo">
						<a href={`${websiteURL}/#/${twitchUserData.login}`}>
							<img src={twitchUserData.image} alt="Twitch" />
							{twitchUserData.login}
						</a>
					</div>
				) : (
					<div onClick={handleTwitchLogin} className="twitchButton">
						Login with Twitch
					</div>
				)}
			</form>
		</div>
	);
};

export default Home;
