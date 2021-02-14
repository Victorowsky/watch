import React, { useContext } from "react";
import { useState } from "react";

import Button from "./Button";
import { DataContext } from "../App";
import "./AdminPanel.css";

const AdminPanel = () => {
  const { admin, setAdmin, setCurrentVideoLink, socket } = useContext(
    DataContext
  );
  const [editVideoLink, setEditVideoLink] = useState();

  const handleAddVideo = () => {
    if (editVideoLink) {
      setCurrentVideoLink(editVideoLink);
      setEditVideoLink("");
    }
  };

  const handleLeaveAdmin = () => {
    const confirmAnswer = window.confirm(
      "Are you sure you don't want to be an admin?"
    );
    if (confirmAnswer) {
      setAdmin(false);
      socket.emit("adminLeave");
    }
  };

  return (
    <>
      <br />
      {admin && (
        // ADDING VIDEO PANEL

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
        </form>
      )}
      <div className="adminButtonsDiv">
        <Button text={"LEAVE ADMIN"} onClick={handleLeaveAdmin} />
      </div>
    </>
  );
};

export default AdminPanel;
