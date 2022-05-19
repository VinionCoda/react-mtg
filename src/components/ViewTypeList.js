import "../CardView.css";
import ListItems from "./ListItems";
import useGetAllDB from "./useGetAllDB";

const ViewTypeList = () => {
  const txt = "no";
  const temp = useGetAllDB(txt);

  const sort_cards =
    temp.length > 0
      ? temp[0].sort((a, b) => a.card_name.localeCompare(b.card_name))
      : [];
  const sort_sets =
    temp.length > 0
      ? temp[1].sort((a, b) => a.set_release > b.set_release)
      : [];

  const rebuild = sort_sets.map((set) => {
    return {
      set_id: set.scry_set_id,
      setname: set.set_name,
      banned: sort_cards.filter((card) => card.card_set === set.scry_set_id),
      limited: [],
    };
  });

  return (
    <>
      <ListItems setlist={rebuild} />
    </>
  );
};

export default ViewTypeList;
