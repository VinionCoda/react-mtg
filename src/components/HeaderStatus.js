import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const HeaderStatus = () => {
  const { user, isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <>
      <div className="user--svg">
      <img src={user.picture} alt={user.name} />
      </div>

      <div className="user--info">
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </div>
    </>
  ) : (
    <>
      <div className="user--svg">
      <FontAwesomeIcon icon={faUser} size="4x" />
      </div>
      <div className="user--info">
        <h3>Please login</h3>
        <p></p>
      </div>
    </>
  );
};

export default HeaderStatus;
