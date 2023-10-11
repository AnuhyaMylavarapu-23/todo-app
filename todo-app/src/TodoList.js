import Todo from "./Todo";
import { v4 as uuidv4 } from "uuid";
import React from "react";

export default function TodoList({ todolist, handleCheckBoxToggle }) {
  return (
    <div>
      {todolist.map((todo) => (
        <Todo {...todo} key={uuidv4()} handleCheckBoxToggle={handleCheckBoxToggle} />
      ))}
    </div>
  );
}