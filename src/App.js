import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import io from "socket.io-client";
import "./App.css";
import AdminPanel from "./comp/AdminPanel";
import PlayerAndChat from "./comp/PlayerAndChat";

export const DataContext = React.createContext();

const App = () => {
  const history = useHistory();
  const [admin, setAdmin] = useState(false);
  const [currentVideoLink, setCurrentVideoLink] = useState("");

  const socket = io(`http://localhost:3001/`);

  const setAdminPermissions = () => {
    if (!admin) {
      setAdmin(true);
    }
    history.push("/");
  };

  return (
    <>
      <DataContext.Provider
        value={{
          admin,
          setAdmin,
          currentVideoLink,
          setCurrentVideoLink,
          socket,
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
            <Route path="/admin">{setAdminPermissions}</Route>
          </Switch>
        </div>
      </DataContext.Provider>
    </>
  );
};

export default App;
