import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import io from "socket.io-client";
import "./App.css";
import AdminPanel from "./comp/AdminPanel";
import AdminLogin from "./comp/AdminLogin";
import PlayerAndChat from "./comp/PlayerAndChat";
import { useEffect } from "react";

export const DataContext = React.createContext();

const socket = io(`http://localhost:3001/`);
// const serverURL = "https://boiling-bastion-80662.herokuapp.com/";
// const socket = io(serverURL);
const App = () => {
  const history = useHistory();
  const [admin, setAdmin] = useState(false);
  const [currentVideoLink, setCurrentVideoLink] = useState("");
  const [videoQueue, setVideoQueue] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState(null);

  useEffect(() => {}, []);

  socket.on("onlineUsers", (onlineUsers) => {
    setOnlineUsers(onlineUsers);
  });
  return (
    <>
      <DataContext.Provider
        value={{
          admin,
          setAdmin,
          socket,
          currentVideoLink,
          setCurrentVideoLink,
          videoQueue,
          setVideoQueue,
          history,
          onlineUsers,
        }}
      >
        <div className="app">
          <Switch>
            <Route path="/" exact>
              <PlayerAndChat />
              {admin && (
                <div className="bottomDiv">
                  <AdminPanel />
                </div>
              )}
            </Route>
            <Route path="/admin">
              <AdminLogin />
            </Route>
          </Switch>
        </div>
      </DataContext.Provider>
    </>
  );
};

export default App;
