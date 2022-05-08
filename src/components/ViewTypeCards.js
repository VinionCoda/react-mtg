import "../CardView.css";
import ListCards from "./ListCards";
import test_json from "./test_json";

const ViewTypeCards = () => {
  return (
    <div id="cardcontainer" className="container--card">
      <ListCards setlist={test_json} />
    </div>
  );
};

export default ViewTypeCards;
