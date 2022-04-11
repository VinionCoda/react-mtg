
import Card from "./Card";
import FlipCard from "./FlipCard";
import test_json from "./test_json";
import  "../CardView.css";
import ListCards from "./ListCards";

const ViewTypeCards = () => {

let card = <Card />;
let flip = <FlipCard />


  return (
    <div id="cardcontainer" className="container--card">
<ListCards setlist = {test_json} />
   </div> 
  )
}

export default ViewTypeCards