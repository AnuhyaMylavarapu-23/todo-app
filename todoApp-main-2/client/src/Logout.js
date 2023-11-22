import React, { useContext } from "react";
import { StateContext } from "./contexts";

export default function Logout() {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
    dispatch({ type: "CLEAR_TODOS" });
  };

  return (
    <form onSubmit={handleLogout}>
      Logged in as: &nbsp;<b>{user.username}</b>&nbsp;
      <br />
      <br />
      <input type="submit" value="Logout" />
    </form>
  );
}