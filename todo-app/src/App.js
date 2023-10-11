import React, { useState } from "react";
import "./App.css";
import UserBar from "./UserBar";
import CreateTodoItem from "./CreateTodoItem";
import TodoList from "./TodoList";

function App() {
  const [user, setUser] = useState("");
  const [todolist, setTodoList] = useState([
    {
      title: "ITEM1",
      description: "DESC",
      author: user,
      dateCreated: Date.now(),
      completed: false,
    },
    {
      title: "ITEM2",
      description: "DESC",
      author: user,
      dateCreated: Date.now(),
      completed: false,
    },
  ]);

  const handleAddTodoItem = (newTodo) => {
    setTodoList([newTodo, ...todolist]);
  };

  const handleCheckBoxToggle = (title) => {
    const updatedList = todolist.map((todo) => {
      if (todo.title === title) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodoList(updatedList);
  };

  return (
    <div>
      <br />
      <UserBar user={user} setUser={setUser} />
      <br />
      <hr />
      <label>
        <h3>Create TODO : </h3>
      </label>
      <br />
      <span>&nbsp;&nbsp;</span>
      <CreateTodoItem user={user} handleAddTodoItem={handleAddTodoItem} />
      <br />
      <hr />
      <div>
        <h3>Todo List</h3>
        <TodoList todolist={todolist} handleCheckBoxToggle={handleCheckBoxToggle} />
      </div>
    </div>
  );
}

export default App;