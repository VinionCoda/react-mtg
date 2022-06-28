import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButtonRedirect = () => {
    const { isAuthenticated, loginWithRedirect } = useAuth0();

    return (
      !isAuthenticated && (
        <button
          onClick={() => {
            loginWithRedirect();
          }}
  
          className="btn btn-success"
        >
          Log In
        </button>
      )
    );
  };


export default LoginButtonRedirect