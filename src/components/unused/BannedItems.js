import ManaCost from "./ManaCost";
import useGetCardCollection from "./useGetCardsByCollection";
import ListItems from "./ListItems";
import "../List.css";

/* Generates an unordered list of banned card from a set 
*/
const SetList = ({ cardlist }) => {
  //const list = useGetCardCollection(cardlist);

  return (
 <ListItems setlist={cardlist}/>
  )
};

export default SetList;