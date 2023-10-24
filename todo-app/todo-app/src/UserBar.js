import React from 'react';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';

export default function UserBar({ user, dispatchUser }) {
  if (user) {
    return <Logout user={user} dispatchUser={dispatchUser} />;
  }

  return (
    <div>
      <h3>
        <u>
          <strong>Login/Registration</strong>
        </u>
      </h3>
      <Login dispatchUser={dispatchUser} />
      <Register dispatchUser={dispatchUser} />
    </div>
  );
}