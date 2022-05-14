import Header from "./Header";
import Footer from "./Footer";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import LoginStatus from "./LoginStatus";
import useViewSelector from "./useViewSelector";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faTable, faList } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";

import useBuildViewList from "./useBuildViewList";

import "../Page.css";

const Home = () => {
  const [view, setView] = useState("");
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  console.log(useBuildViewList());

  return (
    <>
      <Header />
      <div className="body__container">
        {/* Main side bar */}

        <div id="side_bar" className="side_bar">
          <div className="side_selector">
            <LoginButton /> <LogoutButton /> <LoginStatus />{" "}
            <button
              onClick={async () => {
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
                  console.log(result);
                } catch (err) {
                  console.log(err.message);
                }
              }}
            >
              {" "}
              Test Secure API
            </button>
            <button
              onClick={() => {
                setView("");
              }}
            >
              <FontAwesomeIcon icon={faImage} />
            </button>{" "}
            <button
              onClick={() => {
                setView("ViewList");
              }}
            >
              <FontAwesomeIcon icon={faList} />
            </button>{" "}
            <button
              onClick={() => {
                setView("ViewTable");
              }}
            >
              <FontAwesomeIcon icon={faTable} />
            </button>
          </div>
        </div>

        <div className="container">{useViewSelector(view)}</div>
      </div>
      <button id="myBtn" title="Go to top">
        Top
      </button>
      <Footer />
    </>
  );
};
export default Home;
