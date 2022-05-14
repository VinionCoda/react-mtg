import "../CardView.css";
import ListTable from "./ListTable";
import test_json from "./test_json";

const ViewTypeTable = () => {
  return (
    <>
      <ListTable setlist={test_json} />
    </>
  );
};

export default ViewTypeTable;
