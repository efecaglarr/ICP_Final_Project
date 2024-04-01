import React from "react";
import { useAuth } from "./use-auth-client";

const whoamiStyles = {
  border: "1px solid #1a1a1a",
  marginBottom: "1rem",
  padding: "1rem",
};

import useStyles from "./styles";

function LoggedIn() {
  
  React.useEffect(() => {
    const reloadCount = sessionStorage.getItem('reloadCount');
    if (reloadCount < 1) {
      sessionStorage.setItem('reloadCount', String(Number(reloadCount) + 1));
      window.location.reload();
    } else {
      sessionStorage.removeItem('reloadCount');
    }
  }, []);
  
  const [result, setResult] = React.useState("");
  const classes = useStyles();
  const { whoamiActor, logout } = useAuth();

  const handleClick = async () => {
    const whoami = await whoamiActor.whoami();
    setResult(whoami);
  };

  return (
    <div className={classes.container}>
      <h1>Internet Identity Client</h1>
      <h2>You are authenticated!</h2>
      <p>To see how a canister views you, click this button!</p>
      <button
        type="button"
        id="whoamiButton"
        className={`${classes.button} primary`}
        onClick={handleClick}
      >
        Who am I?
      </button>
      <input
        type="text"
        readOnly
        id="whoami"
        value={result}
        placeholder="your Identity"
        style={whoamiStyles}
      />
      <button className={classes.button} id="logout" onClick={logout}>
        log out
      </button>
    </div>
  );
}

export default LoggedIn;