import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle} from "@fortawesome/free-solid-svg-icons";

const LoginStatus = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated ? (
        <div className="user_info">
          <img src={user.picture} alt={user.name} className="user_image" />
          <h3 className="user_name" > {user.name}</h3>
        </div>
    ) : (
      <div className="user_info">
       <FontAwesomeIcon icon={faUserCircle} className="user_image"  />
       <h3 className="user_account" > Account </h3>
      </div>
    )
  );
};

export default LoginStatus;
