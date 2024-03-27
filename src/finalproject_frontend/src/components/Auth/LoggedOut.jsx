import React from "react";
import { useAuth } from "./use-auth-client";
import useStyles from "./styles.js"

function LoggedOut() {
  const { login } = useAuth();
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1>Internet Identity Client</h1>
      <h2>You are not authenticated</h2>
      <p>To log in, click this button!</p>
      <button className={classes.button} type="button" id="loginButton" onClick={login}>
        Log in
      </button>
    </div>
  );
}

export default LoggedOut;