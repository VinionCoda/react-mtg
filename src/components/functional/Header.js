import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Image} from "react-bootstrap";

import SideBarUserWidget from "./SideBarUserWidget";
import ShowModal from "../functional/ShowModal";
import HeaderUserWidget from "../functional/HeaderUserWidget";

import "../../Header.css";


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
        <Link to="/upload">Ban Cards</Link>
      </span>
      <span className="menu_item" >
        <Link to="/unban">Unban Cards</Link>
      </span>

      <span className="menu_item" style={{ visiblity: "hidden" }}>
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
      <span className="menu_item" style={{ visibility: "hidden" }}>
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

      <div className="navi">

        <span className="header__icon" onClick={toggleModal}>
          <FontAwesomeIcon icon={faBars} size="2x" inverse />
        </span>
        <h2 id="title" className="header--title ">
          Cleaver Road MTG Banned List
        </h2>

        <div className="log_in"> <SideBarUserWidget /><HeaderUserWidget /></div>

      </div>
      <div className="banner">
        <HeaderNavi isAuthenticated={isAuthenticated} />
      </div>
     
      <div className="image_wapper">
        <Image src="/img/thunder4.jpg" fluid />
      </div>
  
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
