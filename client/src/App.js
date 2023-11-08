import React, { useReducer } from "react";
import "./App.css";

import UserBar from "./UserBar";
import CreateTodoItem from "./CreateTodoItem";
import TodoList from "./TodoList";
import appReducer from "./todoReducer";

function App() {
  const [state, dispatch] = useReducer(appReducer, {
    user: "",
    todolist: [],
  });

  const { user, todolist } = state;

  const handleAddTodoItem = (newTodo) => {
    dispatch({ type: "CREATE_TODO", ...newTodo });
  };

  const handleCheckBoxToggle = (id) => {
    dispatch({ type: "TOGGLE_TODO", id });
  };

  const handleDeleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", id });
  };

  return (
    <div>
      <UserBar user={user} dispatchUser={dispatch} />
      <hr />

      {user && (
        <div>
          <h3>
            <u>
              <strong>Create TODO:</strong>
            </u>
          </h3>
          <CreateTodoItem user={user} handleAddTodoItem={handleAddTodoItem} />
          <hr />
        </div>
      )}

      <div>
        <h3>
          <u>
            <strong>Todo List:</strong>
          </u>
        </h3>
        <TodoList
          todolist={todolist}
          handleCheckBoxToggle={handleCheckBoxToggle}
          handleDeleteTodo={handleDeleteTodo}
        />
      </div>
    </div>
  );
}

export default App;