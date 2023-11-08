import React from 'react';

export default function Logout({ user, dispatchUser }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatchUser({ type: "LOGOUT" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Logged in as: <b>{user}</b></p>
      <input type="submit" value="Logout" />
    </form>
  );
}