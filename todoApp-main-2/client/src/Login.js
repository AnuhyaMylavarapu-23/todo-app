import { useState, useEffect } from "react";
import { useResource } from "react-request-hook";
import { useContext } from "react";
import { StateContext } from "./contexts";

export default function Login() {
  const [username, setUsername] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(StateContext);

  const [user, login] = useResource((username, password) => ({
    url: "/auth/login",
    method: "post",
    data: { username, password },
  }));

  useEffect(() => {
    if (user && user.isLoading === false && (user.data || user.error)) {
      if (user.error) {
        console.log("Login failed reached");
      } else {
        dispatch({
          type: "LOGIN",
          username,
          access_token: user.data.access_token,
        });
      }
    }
  }, [user, username, dispatch]);

  useEffect(() => {
    setLoginFailed(Boolean(user?.error));
  }, [user]);

  return (
    <>
      {loginFailed && <span style={{ color: "red" }}>Invalid username or password</span>}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          login(username, password);
        }}
      >
        <label htmlFor="login-username">Username: &nbsp;</label>
        &nbsp;
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          name="login-username"
          id="login-username"
        />
        &nbsp;
        <br />
        <br />
        <label htmlFor="login-password">Password:</label>
        &nbsp;
        <input
          type="password"
          name="login-password"
          id="login-password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />{" "}
        &nbsp; &nbsp; <br /> <br />
        <input type="submit" value="Login" disabled={username.length === 0} />
      </form>
    </>
  );
}