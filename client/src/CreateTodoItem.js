import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CreateTodoItem({ user, handleAddTodoItem }) {
  const date = new Date();
  const currentDay = String(date.getDate()).padStart(2, "0");
  const currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  const currentYear = date.getFullYear();
  const currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
  const id = uuidv4();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitle = (evt) => {
    setTitle(evt.target.value);
  };

  const handleDescription = (evt) => {
    setDescription(evt.target.value);
  };

  const handleCreate = () => {
    const newTodo = {
      id,
      title,
      description,
      author: user,
      dateCreated: currentDate,
      completed: false,
    };
    handleAddTodoItem(newTodo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="create-title">Title:</label>{" "}
        <input
          type="text"
          value={title}
          onChange={handleTitle}
          name="create-title"
          id="create-title"
        />
      </div>

      <div>
        <label htmlFor="create-description">Description:</label>{" "}
        <input
          type="text"
          value={description}
          onChange={handleDescription}
          name="create-description"
          id="create-description"
        />
      </div>

      <div>Author: {user}</div>
      <div>Date Created: {currentDate}</div>

      <input type="submit" value="Create" />
    </form>
  );
}