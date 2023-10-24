function userReducer(state, action) {
    switch (action.type) {
      case "LOGIN":
      case "REGISTER":
        return action.username;
      case "LOGOUT":
        return "";
      default:
        return state;
    }
  }
  
  function todosReducer(state, action) {
    switch (action.type) {
      case "CREATE_TODO":
        const newTodo = {
          id: action.id,
          title: action.title,
          description: action.description,
          author: action.author,
          dateCreated: action.dateCreated,
          completed: action.completed,
        };
        return [newTodo, ...state];
      case "TOGGLE_TODO":
        return state.map((item) =>
          item.id === action.id ? { ...item, completed: !item.completed } : item
        );
      case "DELETE_TODO":
        return state.filter((item) => item.id !== action.id);
      default:
        return state;
    }
  }
  
  export default function appReducer(state, action) {
    return {
      user: userReducer(state.user, action),
      todolist: todosReducer(state.todolist, action),
    };
  }