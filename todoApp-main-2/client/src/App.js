import "./App.css";
import React, { useReducer, useEffect } from "react";
import { useResource } from "react-request-hook";
import UserBar from "./UserBar";
import CreateTodoItem from "./CreateTodoItem";
import TodoList from "./TodoList";
import appReducer from "./todoReducer";
import { StateContext } from "./contexts";

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todolist: [],
  });

  const { user } = state;

  const [todoResponse, getTodos] = useResource(() => ({
    url: "/todo",
    method: "get",
    headers: { Authorization: `${user?.access_token}` },
  }));

  useEffect(() => {
    if (user) {
      getTodos();
    }
  }, [user?.access_token]);

  useEffect(() => {
    if (todoResponse && !todoResponse.isLoading && todoResponse.data) {
      dispatch({
        type: "FETCH_TODOS",
        todos: todoResponse.data.reverse(),
      });
    }
    if (todoResponse.error) {
      dispatch({ type: "CLEAR_TODOS" });
    }
  }, [todoResponse]);

  useEffect(() => {
    document.title = user ? `${user.username}'s Blog` : "Blog";
  }, [user]);

  const userBarStyle = {
    backgroundColor: "#f3f4f6",
  };

  return (
    <div style={userBarStyle}>
      <StateContext.Provider value={{ state, dispatch }}>
        <br />
        <UserBar />
        <br />
        <hr />

        {user && (
          <>
            <label>
              <h3>
                <u>
                  <strong>Create TODO</strong>
                </u>
                :
              </h3>
            </label>
            <br />
            <span>&nbsp;&nbsp;</span>
            <CreateTodoItem />
            <br />
            <hr />
          </>
        )}

        <div>
          <h3>
            <u>
              <strong>Todo List</strong>
            </u>
            :
          </h3>
          <TodoList />
        </div>
      </StateContext.Provider>
    </div>
  );
}

export default App;