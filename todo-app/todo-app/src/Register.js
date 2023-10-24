import React, { useState } from "react";

export default function Register({ dispatchUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleUsername = (evt) => {
    setUsername(evt.target.value);
  };

  const handlePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const handleRepeatPassword = (evt) => {
    setRepeatPassword(evt.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatchUser({ type: "REGISTER", username });
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="register-username">Email</label>
          <input
            type="text"
            value={username}
            onChange={handleUsername}
            name="register-username"
            id="register-username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-password">Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePassword}
            name="register-password"
            id="register-password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="register-password-repeat">Repeat password</label>
          <input
            type="password"
            value={repeatPassword}
            onChange={handleRepeatPassword}
            name="register-password-repeat"
            id="register-password-repeat"
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Register"
            disabled={
              username.length === 0 ||
              password.length === 0 ||
              password !== repeatPassword
            }
          />
        </div>
      </form>
    </div>
  );
}