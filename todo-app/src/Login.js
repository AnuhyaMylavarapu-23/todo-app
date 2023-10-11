import React, { useState } from 'react';

export default function Login({ setUser }) {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (evt) => {
    setUsername(evt.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(username);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="login-username">Username: </label>
      <input
        type="text"
        value={username}
        onChange={handleUsernameChange}
        name="login-username"
        id="login-username"
      />
      <label htmlFor="login-password">Password: </label>
      <input type="password" name="login-password" id="login-password" />
      <input type="submit" value="Login" disabled={username.length === 0} />
    </form>
  );
}