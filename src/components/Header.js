import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";


const Header = () => {
  useEffect(() => {
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementsByClassName("header__icon")[0];

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("modal__close")[0];

    // When the user clicks the button, open the modal
    btn.onclick = function () {
      modal.style.display = "inline";
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  });

  return (
    <header className="header">
      <span className="header__icon">
        <FontAwesomeIcon icon={faBars} size="2x" inverse  />
      </span>
      <h2 className="header__text">Cleaver Road MTG Group</h2>
   
      <div id="myModal" className="modal">
        <div className="modal__content">
          <span className="modal__close">&times;</span>
          <p>Some text in the Modal..</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
