import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";

export default function CreateTodoItem() {
  const date = new Date();
  const currentDay = String(date.getDate()).padStart(2, "0");
  const currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  const currentYear = date.getFullYear();
  const currentDate = `${currentDay}-${currentMonth}-${currentYear}`;
  const id = uuidv4();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [todo, createTodo] = useResource(
    ({ title, description, author, dateCreated, completed, _id }) => ({
      url: "/todo",
      method: "post",
      headers: { Authorization: `${state.user.access_token}` },
      data: { title, description, author, dateCreated, completed, _id },
    })
  );

  const handleTitle = (evt) => {
    setTitle(evt.target.value);
  };

  const handleDescription = (evt) => {
    setDescription(evt.target.value);
  };

  const handleCreate = () => {
    const newTodo = {
      _id: id,
      title,
      description,
      author: user.username,
      dateCreated: currentDate,
      completed: false,
      dateCompleted: "",
    };
    createTodo(newTodo);
  };

  useEffect(() => {
    if (!todo.isLoading && todo.data) {
      const { title, description, _id, author, dateCreated, completed } = todo.data;
      dispatch({
        type: "CREATE_TODO",
        title,
        description,
        _id,
        author,
        dateCreated,
        completed,
      });
    }
  }, [todo]);

  const userBarStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#f3f4f6",
    width: "100%",
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCreate();
      }}
    >
      <div style={userBarStyle}>
        <div>
          &nbsp;
          <label htmlFor="create-title">Title:</label>
          &nbsp;
          <input
            type="text"
            onChange={handleTitle}
            name="create-title"
            id="create-title"
          />
        </div>
        <br />
        <div>
          &nbsp;<label htmlFor="create-description">Description:</label>
          &nbsp;
          <input
            type="text"
            onChange={handleDescription}
            name="create-description"
            id="create-description"
          />
        </div>
        &nbsp;<div>Author: {user.username} </div>
        &nbsp; <div>DateCreated: {currentDate}</div>&nbsp;
        <br />
        <input type="submit" value="Create" />
      </div>
    </form>
  );
}