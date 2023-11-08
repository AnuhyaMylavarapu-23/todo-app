import React from 'react';

export default function Todo({
  id,
  title,
  description,
  author,
  dateCreated,
  completed,
  handleCheckBoxToggle,
  handleDeleteTodo,
}) {
  const onCheckboxChange = () => {
    handleCheckBoxToggle(id);
  };

  const onDeleteTodo = () => {
    handleDeleteTodo(id);
  };

  const date = new Date();
  const currentDay = String(date.getDate()).padStart(2, "0");
  const currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  const currentYear = date.getFullYear();
  const currentDate = `${currentDay}-${currentMonth}-${currentYear}`;

  return (
    <div>
      <h3>Title: {title}</h3>
      <div>Description: {description}</div>
      <div>Author: {author}</div>
      <div>Date Created: {dateCreated}</div>
      <div>
        Completed:{" "}
        <input
          type="checkbox"
          checked={completed}
          onChange={onCheckboxChange}
        />
      </div>

      {completed && (
        <div>Date Completed: {currentDate}</div>
      )}

      <div>
        <button type="button" onClick={onDeleteTodo}>
          Delete
        </button>
      </div>

      <hr />
    </div>
  );
}