import React, { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../App";
import { useParams } from "react-router-dom";

const AdminLogin = () => {
  const { socket, admin, setAdmin, history } = useContext(DataContext);
  const [password, setPassword] = useState("");
  const [isAlert, setIsAlert] = useState(0);
  const { twitchStreamer } = useParams();

  const handleLogin = () => {
    socket.emit("handleLogin", { password, twitchStreamer });
  };

  socket.on("handleLoginAnswer", ({ success, message }) => {
    if (success) {
      if (!admin) {
        setAdmin(true);
      }
      history.push("/");
    } else {
      setIsAlert((prev) => {
        prev++;
        if (prev === 1) {
          alert(message);
        }
        setTimeout(() => {
          setIsAlert(0);
        }, 100);
      });
    }
  });
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <form>
        <input
          type="text"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          type="submit"
          style={{ display: "none" }}
        ></button>
      </form>
    </div>
  );
};

export default AdminLogin;
