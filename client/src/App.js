import "./App.css";

import UserBar from "./UserBar";
import CreateTodoItem from "./CreateTodoItem";
import { useReducer, useEffect } from "react";
import { useResource } from "react-request-hook";
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
    url: "/todos",
    method: "get",
  }));

  useEffect(getTodos, []);

  useEffect(() => {
    if (todoResponse && todoResponse.data) {
      dispatch({ type: "FETCH_TODOS", todos: todoResponse.data.reverse() });
    }
  }, [todoResponse]);


      const userBarStyle = {
        backgroundColor: "#f3f4f6",
      };
  
  if (user) {
    return (
      <div style={userBarStyle}>
        <StateContext.Provider
          value={{
            state,
            dispatch,
          }}
        >
          <br />
          <UserBar />
          <br />
          <hr></hr>

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
          <hr></hr>

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
  } else {
    return (
      <div>
        <StateContext.Provider
          value={{
            state,
            dispatch,
          }}
        >
          <br />
          <UserBar />
          <br />
          <span>&nbsp;&nbsp;</span>
          <br />
          <hr></hr>
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
}

export default App;
