import React from 'react';

export default function Logout({ user, setUser }) {
  const handleLogout = (e) => {
    e.preventDefault();
    setUser('');
  };

  return (
    <form onSubmit={handleLogout}>
      Logged in as: <b>{user}</b>
      <button type="submit">Logout</button>
    </form>
  );
}