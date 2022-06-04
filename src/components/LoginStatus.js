import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const LoginStatus = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated ? (
      <>
           <div className="user--svg">
      <img src={user.picture} alt={user.name} />
      </div>{/* <FontAwesomeIcon icon={faUser} size="4x" /> */}
      <hr />
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </>
    ):(
      <p>Please Log-In</p>
    )
  );
};

export default LoginStatus;
