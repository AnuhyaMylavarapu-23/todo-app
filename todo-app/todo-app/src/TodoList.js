import Todo from "./Todo";
import React from "react";

export default function TodoList({ todolist, handleCheckBoxToggle, handleDeleteTodo }) {
  return (
    <div>
      {todolist.map((todo) => (
        <Todo
          {...todo}
          key={todo.id}
          handleCheckBoxToggle={handleCheckBoxToggle}
          handleDeleteTodo={handleDeleteTodo}
        />
      ))}
    </div>
  );
}