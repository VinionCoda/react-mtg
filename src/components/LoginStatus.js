import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const LoginStatus = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div>
        <h3><FontAwesomeIcon icon={faUser} /> {user.name}</h3>
        <h3>{user.email}</h3>
      </div>
    )
  );
};

export default LoginStatus;
