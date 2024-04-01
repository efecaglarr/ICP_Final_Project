import { AuthClient } from "@dfinity/auth-client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { canisterId, createActor } from 'declarations/finalproject_backend';
import { useNavigate } from "react-router";

const AuthContext = createContext();

const defaultOptions = {
  createOptions: {
    idleOptions: {
      disableIdle: true,
    },
  },

  loginOptions: {
    identityProvider:
      process.env.DFX_NETWORK === "ic"
        ? "https://identity.ic0.app/#authorize"
        : `http://be2us-64aaa-aaaaa-qaabq-cai.localhost:4943`,
  },
};

export const useAuthClient = (options = defaultOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authClient, setAuthClient] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [whoamiActor, setWhoamiActor] = useState(null);

  useEffect(() => {
    AuthClient.create(options.createOptions).then(async (client) => {
      updateClient(client);
    });
  }, []);

  async function login () {
    await authClient.login({
      ...options.loginOptions,
      onSuccess: () => {
        updateClient(authClient);
      },
    });
    
  };

  async function updateClient(client) {
    const isAuthenticated = await client.isAuthenticated();
    setIsAuthenticated(isAuthenticated);

    const identity = client.getIdentity();
    setIdentity(identity);

    const principal = identity.getPrincipal();
    setPrincipal(principal);

    localStorage.setItem('profile', principal);

    setAuthClient(client);

    const actor = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    setWhoamiActor(actor);

  }

  async function logout() {
    await authClient?.logout();
    await updateClient(authClient);
  }

  async function authInit() {
    try {

        const authClient = await AuthClient.create();

        if (await authClient.isAuthenticated()) {

            const identity = await authClient.getIdentity();
            const principal = identity.getPrincipal();

            setUser(principal.toText());
        } else {
            console.log("User is not authenticated");
        }
    } catch (error) {
        console.error("Error initializing authentication:", error);
    }
}


  return {
    isAuthenticated,
    login,
    logout,
    // authInit,
    authClient,
    identity,
    principal,
    whoamiActor,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);