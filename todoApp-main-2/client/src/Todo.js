import React, { useContext, useEffect } from "react";
import { StateContext } from "./contexts";
import { useResource } from "react-request-hook";

export default function Todo({
  title,
  description,
  author,
  dateCreated,
  completed,
  _id,
  dateCompleted,
}) {
  console.log("Todo ID Check : ", title, _id, completed, dateCompleted);
  const date = new Date();

  const currentDay = String(date.getDate()).padStart(2, "0");
  const currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  const currentYear = date.getFullYear();
  const currentHour = String(date.getHours()).padStart(2, "0");
  const currentMinute = String(date.getMinutes()).padStart(2, "0");
  const currentSecond = String(date.getSeconds()).padStart(2, "0");


  const currentDate = `${currentDay}-${currentMonth}-${currentYear} ${currentHour}:${currentMinute}:${currentSecond}`;

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const [dtodo, deleteTodo] = useResource(({ _id }) => ({
    url: `/todo/${_id}`,
    method: "delete",
    headers: { Authorization: `${state.user.access_token}` },
  }));

  const [uptodo, updateTodo] = useResource(({ _id }) => ({
    url: `/todo/${_id}`,
    method: "put",
    headers: { Authorization: `${state.user.access_token}` },
  }));

  const onCheckboxChange = () => {
    const updatedTodo = {
      title,
      description,
      author,
      dateCreated,
      completed: !completed,
      _id,
      dateCompleted: completed ? "" : currentDate,
    };
    updateTodo(updatedTodo);
  };

  const deletedData = {
    title,
    description,
    author,
    dateCreated,
    completed,
    _id,
    dateCompleted: "",
  };

  const onDeleteTodo = () => {
    console.log("Delete Todo Reached : ", deletedData);
    console.log("ID : ", _id);
    deleteTodo(deletedData);
  };

  useEffect(() => {
    if (dtodo.isLoading === false && dtodo.data) {
      dispatch({
        type: "DELETE_TODO",
        _id,
      });
    }
  }, [dtodo, dispatch, _id]);

  useEffect(() => {
    if (uptodo.isLoading === false && uptodo.data) {
      dispatch({
        type: "TOGGLE_TODO",
        _id,
        cdate: uptodo.data.dateCompleted,
        completed: uptodo.data.completed,
      });
    }
  }, [uptodo, dispatch, _id]);

  const userBarStyle = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#f3f4f6",
    borderBottom: "1px solid #ccc",
    width: "100%",
    padding: "10px",
    margin: "0",
  };

  return (
    <div style={userBarStyle}>
      <h3>Title: {title}</h3>
      <div>Description: {description}</div>
      <br />
      <div>Author: {author}</div>
      <br />
      <div>DateCreated: {dateCreated}</div>
      <br />
      <div>
        Completed:{" "}
        <input type="checkbox" checked={completed} onChange={onCheckboxChange} />
      </div>
      {completed && <div>dateCompleted: {dateCompleted}</div>}
      <br />
      <div>
        <button type="button" onClick={onDeleteTodo}>
          Delete
        </button>
      </div>
      <br />
    </div>
  );
}