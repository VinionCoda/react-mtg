import "../CardView.css";
import ListItems from "./ListItems";
import test_json from "./test_json";

const ViewTypeList = () => {
  return (    
    <>
      <ListItems setlist={test_json} />
    </>
  );
};

export default ViewTypeList;
