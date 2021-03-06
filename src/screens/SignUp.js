import PropTypes from 'prop-types';
import React from 'react';
import { Navigate } from 'react-router';
import { attemptLogin } from '../api';

export default function SignUp({ nextLocation }) {
  const [loginResource, setLoginResource] = React.useState();
  const [startTransition, isPending] = React.useTransition({
    // We never want this component to fully suspend.
    timeoutMs: Infinity
  });

  const onSubmit = event => {
    event.preventDefault();
    startTransition(() => {
      setLoginResource(attemptLogin());
    });
  };

  const loginResult = loginResource?.read();
  if (loginResult?.ok === true) {
    // Redirect the user to where they want to go.
    // Also, maybe you would want to set the user in context here or something.
    return <Navigate to={nextLocation} />;
  }

  // Otherwise we can display some inline validation messages...
  // A real example would probably do something better than this.
  return (
    <form onSubmit={onSubmit}>
      {loginResult?.error && <h1>{loginResult?.error}</h1>}

      <label>Username</label>
      <input type="text" name="username" />

      <label>Password</label>
      <input type="password" name="password" />

      <button type="submit" disabled={isPending}>
        Sign Up
      </button>
    </form>
  );
}

SignUp.propTypes = {
  nextLocation: PropTypes.string.isRequired
};
