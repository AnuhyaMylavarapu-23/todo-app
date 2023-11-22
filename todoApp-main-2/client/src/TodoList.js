import React, { useContext } from "react";
import Todo from "./Todo";
import { StateContext } from "./contexts";

export default function TodoList() {
  const { state } = useContext(StateContext);
  const { todolist } = state;

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#f3f4f6",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={containerStyle}>
      {todolist.length === 0 ? (
        <h2>No todos found.</h2>
      ) : (
        todolist.map((todo) => (
          <Todo {...todo} key={todo._id || todo.id} />
        ))
      )}
    </div>
  );
}