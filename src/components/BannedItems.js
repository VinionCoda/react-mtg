import ManaCost from "./ManaCost";
import "../List.css";

import useGetCardCollection from "./useGetCardsByCollection";
import ListItems from "./ListItems";

/* Generates an unordered list of banned card from a set 

*/
const SetList = ({ cardlist }) => {
  //const list = useGetCardCollection(cardlist);

  return (
 <ListItems setlist={cardlist}/>
  )
};

export default SetList;