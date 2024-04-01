import React from "react";
import { useAuth } from "./use-auth-client";
import useStyles from "./styles.js"
import { useNavigate } from "react-router";

function LoggedOut() {
  const { login } = useAuth();
  const classes = useStyles();
  const navigate = useNavigate();

  // const buttonClick = () => {
  //   login();
  //   navigate('/');
  //   setTimeout(() => {
  //     window.location.reload();
  //     // setIsLoading(false);
  // }, 5000); // = 5 seconds
  // }

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