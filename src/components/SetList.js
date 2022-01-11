import "../List.css";
import ListItems from "./ListItems";
import { useEffect, useState } from "react";
import SetCardType from "./SetCardType";

/* Generates an unordered list of banned card from a set 

*/
const SetList = ({ sets }) => {
  const [cardView, setCardView] = useState({});

  const toggleModal = () => {
    const modal = document.getElementById("cardview");
    const closebtn = document.getElementById("cardview_close");

    modal.style.display = "block";
    modal.style.overflow = "initial";
    document.body.style.position = 'fixed';

    closebtn.onclick = function () {
      modal.style.display = "none";

    };

    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
        document.body.style.position = 'fixed';
      }
    };
  };

  /*
  useEffect(() => {
   
  });

*/

  return (
    <div >
      <div>
        {sets.map((setlist, key) => (
          <ListItems
            setlist={setlist}
            key={key}
            getCard={(card) => setCardView(card)}
          />
        ))}
      </div>

      <div id="cardview" className="modal">
        <div className="modal__content" style={{ marginTop: 80, overflow: "unset" }}>
          <a id="cardview_close" className="modal__close">
            &times;
          </a>
          <br />
          <SetCardType card={cardView} showCard ={()=> toggleModal()}/>
        </div>
      </div>
    </div>
  );
};

export default SetList;
