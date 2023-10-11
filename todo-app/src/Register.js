import React, { useState } from "react";

export default function Register({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleUsernameChange = (evt) => {
    setUsername(evt.target.value);
  };

  const handlePasswordChange = (evt) => {
    setPassword(evt.target.value);
  };

  const handleEmailChange = (evt) => {
    setEmail(evt.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(username);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="register-username">Username:</label>
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
        name="register-username"
        id="register-username"
      />
      <label htmlFor="register-password">Password:</label>
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        name="register-password"
        id="register-password"
      />
      <label htmlFor="register-Email">Enter email:</label>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        name="register-Email"
        id="register-Email"
      />
      <input
        type="submit"
        value="Register"
        disabled={
          username.length === 0 ||
          password.length === 0 ||
          password !== email
        }
      />
    </form>
  );
}