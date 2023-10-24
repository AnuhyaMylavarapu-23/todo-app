import React, { useState } from 'react';

export default function Login({ dispatchUser }) {
  const [username, setUsername] = useState('');

  const handleUsername = (evt) => {
    setUsername(evt.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatchUser({ type: "LOGIN", username });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login-username">Email</label>
          <input
            type="text"
            value={username}
            onChange={handleUsername}
            name="login-username"
            id="login-username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input
            type="password"
            name="login-password"
            id="login-password"
          />
        </div>
        <div className="form-group">
          <input type="submit" value="Login" disabled={username.length === 0} />
        </div>
      </form>
    </div>
  );
}