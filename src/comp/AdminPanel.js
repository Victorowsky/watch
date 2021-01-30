import React, { useContext } from "react";
import { useState } from "react";
import { DataContext } from "../App";
const AdminPanel = () => {
  const { admin, setAdmin, setCurrentVideoLink } = useContext(DataContext);
  const [editVideoLink, setEditVideoLink] = useState();
  const [videoQueue, setVideoQueue] = useState();
  return (
    <>
      <button
        onClick={() => setAdmin((prev) => !prev)}
        style={admin ? { backgroundColor: "#06d6a0" } : {}}
      >
        ADMIN
      </button>
      {admin && (
        // ADDING VIDEO PANEL
        <form>
          <input
            type="text"
            value={editVideoLink}
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
              setCurrentVideoLink(editVideoLink);
              setEditVideoLink("");
            }}
            type="submit"
          ></button>
        </form>
      )}
    </>
  );
};

export default AdminPanel;
