import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ManaCost from "./ManaCost";
import SetIcon from "./SetIcon";
import useGetCardDB from "./useGetCardDB";
import ShowModal from "./ShowModal";
import "../Upload.css";

const UnbanCard = () => {
  const [cardlist, setCardlist] = useState({ data: [] });
  const [text, setText] = useState("");
  const [banned, setBannned] = useState("");
  const [settings, setSettings] = useState({
    type: "",
    title: "",
    text: "",
    buttonlayout: "confirm",
    arr: [],
    priority: "primary",
    toogle: false,
    callback: "",
    callback2: "",
  });

  let cardDB = useGetCardDB(banned);

  const verify = (id) => {
    const card = cardlist.data.find((card) => card.card_id === id);
    const name =
      card.dual_card_name !== "" ? card.dual_card_name : card.card_name;
    setSettings({
      type: "confirm",
      title: "Remove Card",
      text: `Do you want to remove ${name}`,
      buttonlayout: "confirm",
      arr: [card],
      priority: "primary",
      toogle: false,
      callback: removeCard,
      callback2: "",
    });
  };

  const getSearch = (value) => {
    setText(value);
  };

  const removeCard = (id)=>{

    
  }

  useEffect(() => {
    const temp_sort = cardDB.sort((a, b) =>
      a.card_name.localeCompare(b.card_name)
    );

    const temp_filter = temp_sort.filter((card) =>
      card.card_name.toLowerCase().includes(text.toLowerCase())
    );

    const temp = temp_filter.slice(0, 15);
    text.length !== 0 ? setCardlist({ data: temp }) : setCardlist({ data: [] });
  }, [text]);

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
                className="left_input"
                placeholder="Search..."
                onChange={(event) => getSearch(event.target.value)}
              />
            </div>
            <div className="space_er main__right">
              <h3 className="pb-2"> Result Card List: </h3>
              <div id="card_list" className="list-group list__banned list--mod">
                {cardlist.data.map((card, key) => (
                  <a
                    href={`#${card.card_id}`}
                    className="list-group-item list-group-item-action"
                    aria-current="true"
                    key={key}
                  >
                    <div className="d-flex w-100 ">
                      <SetIcon set_id={card.card_set} css={card.rarity_css} />
                      <h5 className="mb-1 text-start card_name--mod">
                        {card.dual_card_name !== ""
                          ? card.dual_card_name
                          : card.card_name}
                      </h5>

                      <small className="w-50 float-end">
                        <ManaCost mana_cost={card.card_cost} />
                      </small>
                    </div>
                    <div className="line--mod">
                      <span className="">{card.card_type}</span>
                      <span className="">{card.card_setname}</span>
                    </div>

                    <div className="form-check line--right chk_btn">
                      <div></div>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => {
                          verify(card.card_id);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </a>
                ))}
              </div>
              <button
                className="mt-3 btn btn-outline-dark btn--mod"
                type="button"
              >
                Unban Card
              </button>
            </div>
          </div>{" "}
        </div>{" "}
        <div id="side_bar" className="side_bar"></div>
      </div>
      <button onclick="topFunction()" id="myBtn" title="Go to top">
        Top
      </button>

      <ShowModal settings={settings} />

      <Footer />
    </>
  );
};

export default UnbanCard;
