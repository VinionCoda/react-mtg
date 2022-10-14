import Header from "../functional/Header";
import Footer from "../functional/Footer";
import ShowModal from "../functional/ShowModal";
import { useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  CardListRemove,
  fetchAndSortCardDB,
  removeMTGCard,
} from "../functional/UploadFunctions";

import "../../Upload.css";

const UnbanCard = () => {
  const txtInput = useRef(null);
  const cardDB = useRef([]);
  const { getAccessTokenSilently } = useAuth0();
  const [cardlist, setCardlist] = useState([]);
  const [show, setShow] = useState(false);
  const [type, setType] = useState("");
  const [settings, setSettings] = useState({
    type: "",
    title: "",
    text: "",
    data: [],
    toggle: false,
  });
  

  const filterList = (text, arr) => {
    const temp_filter = arr.filter((card) =>
      card.card_name.toLowerCase().includes(text.toLowerCase())
    );
    return temp_filter;
  };

  const getSearch = async () => {
    const txt = txtInput.current.value;

    if (cardlist.length <= 0) {
      cardDB.current = await fetchAndSortCardDB();
    }

    if (txt.length >= 3) {
      setCardlist(filterList(txt, cardDB.current));
    }

    if (txt.length < 3) {
      setCardlist([]);
    }
  };

  const remMtgCard = (card) => {
    console.log("remMTG "+ card)
  const res =  removeMTGCard(card, getAccessTokenSilently);
  const settings = {
    type: "",
    title: "Cleaver MTG Banned List",
    text: "The following card has been unbanned:",
    data: [card],
    toggle: true,
    callback:clearModal,
  }; 
  setSettings(settings);
  setType("alert");
  setShow(true);
  };

  const setModal = (card) => {
    const settings = {
      type: "",
      title: "Cleaver MTG Banned List",
      text: "The following card will be unbanned:",
      data: [card],
      toggle: true,
      callback:remMtgCard,
    }; 
    setSettings(settings);
    setType("");
    setShow(true);
  };

  const clearModal= (card)=>{
    setShow(false);  
  }


  return (
    <>
      <Header />
      <div className="body__container">
        {/* Main side bar */}
        <div id="side_bar" className="side_bar"></div>
        <div className="container">
          <div className="ml-5 w-100">
            <div className="main__left">
              <h3 className="pb-2"> Search For card: </h3>

              {/* Input Search Box */}
              <input
                name=""
                id=""
                ref={txtInput}
                className="left_input"
                placeholder="Search..."
                onChange={getSearch}
              />
            </div>
            <div className="space_er main__right">
              <h3 className="pb-2"> Result Card List: </h3>

              {/* Result List */}
              <CardListRemove cardlist={cardlist} callback ={setModal}/>
            </div>
          </div>{" "}
        </div>{" "}
        {/* Side bar */}
        <div id="side_bar" className="side_bar"></div>
      </div>

      {/* <ShowModal settings={settings} /> */}

      <ShowModal
        settings={settings}
        show={show}
        type={type}
        funct={clearModal}
      />

      <Footer />
    </>
  );
};

export default UnbanCard;
