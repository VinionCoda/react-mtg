import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const useGetAccessToken = async () => {
const {isAuthenticated, getAccessTokenSilently } = useAuth0();
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(
        "https://mtgmongodbserver.herokuapp.com/auth",
        {
          mode: "cors",
          credentials: "same-origin",
          headers: { 
            authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      return result;
    } catch (err) {
      return console.log(err.message);
    }

};

export default useGetAccessToken;
