import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "../Header.css";

const Header = () => {
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementsByClassName("header__icon")[0];

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("modal__close")[0];

    // When the user clicks the button, open the modal
    btn.onClick = function () {
      modal.style.display = "inline";
    };

    // When the user clicks on <span> (x), close the modal
    span.onClick = function () {
      modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onClick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  });

  return (
    <header className="header">
      <span className="header__icon">
        <FontAwesomeIcon icon={faBars} size="2x" inverse />
      </span>
      <h1 id="title">Cleaver Road MTG Banned List</h1>
      <br />

      <div className="menu">
        <span className="menu_item">
          <Link to="/">Home</Link>
        </span>
        <span className="menu_item">
          <Link to="/rules">Group Rules</Link>
        </span>

    
        {  /*
        isAuthenticated && (
          <span className="menu_item">
            <Link to="/upload">Edit List</Link>
          </span>
        )
      
        */}

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

      <br />

      <h5>
        Banned Cards <span className="red_square"> &nbsp;&nbsp;&nbsp;</span>{" "}
        Limited Cards <span className="yellow_square">&nbsp;&nbsp;&nbsp; </span>
      </h5>
      <br />

      <div id="myModal" className="modal">
        <div className="modal__content">
          <span className="modal__close">&times;</span>
          <nav className="nav flex-column">
            <Link to="/">Home</Link>
            <Link to="/rules">Group Rules</Link>
            <Link to="/upload">Edit List</Link>
            <Link to="/unban">Unban Cards</Link>
            <Link to="/download">Download List</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
