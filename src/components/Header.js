import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import ShowModal from "./ShowModal";
import HeaderUserWidget from "./HeaderUserWidget";
import "../Header.css";

const HeaderNavi = ({ isAuthenticated }) => {
  return isAuthenticated ? (
    <div className="menu">
      <span className="menu_item">
        <Link to="/">Home</Link>
      </span>
      <span className="menu_item">
        <Link to="/rules">Group Rules</Link>
      </span>

      <span className="menu_item">
        <Link to="/upload">Edit List</Link>
      </span>
      <span className="menu_item">
        <Link to="/unban">Unban Cards</Link>
      </span>

      <span className="menu_item">
        <Link to="/download">Download List</Link>
      </span>
    </div>
  ) : (
    <div className="menu">
      <span className="menu_item">
        <Link to="/">Home</Link>
      </span>
      <span className="menu_item">
        <Link to="/rules">Group Rules</Link>
      </span>
      <span className="menu_item">
        <Link to="/download">Download List</Link>
      </span>
    </div>
  );
};

const Header = () => {
  const { isAuthenticated } = useAuth0();
  const [toggle, setToggle] = useState(false);

  const toggleModal = () => {
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  return (
    <header className="header" id="main_top">
      <span className="header__icon" onClick={toggleModal}>
        <FontAwesomeIcon icon={faBars} size="2x" inverse />
      </span>
      <h1 id="title" className="header--title ">
        Cleaver Road MTG Banned List
      </h1>
      <br />
      <HeaderNavi isAuthenticated={isAuthenticated} />

      <br />

      <h5 className="header--subtitles">
        Banned Cards <span className="red_square"> &nbsp;&nbsp;&nbsp;</span>{" "}
        Limited Cards <span className="yellow_square">&nbsp;&nbsp;&nbsp; </span>
      </h5>

      <HeaderUserWidget />
      <br />

      <ShowModal
        settings={{}}
        show={toggle}
        type={"menu"}
        funct={toggleModal}
      />
    </header>
  );
};

export default Header;
