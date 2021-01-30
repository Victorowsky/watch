import React, { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../App";
const AdminLogin = () => {
  const { socket, admin, setAdmin, history } = useContext(DataContext);
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    socket.emit("handleLogin", { password });
  };
  socket.on("handleLoginAnswer", ({ success }) => {
    if (success) {
      if (!admin) {
        setAdmin(true);
      }
      history.push("/");
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
