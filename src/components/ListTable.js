import { useContext } from "react";
import ManaCost from "./ManaCost";
import SetIcon from "./SetIcon";
import Table from "react-bootstrap/Table";
import ViewContext from "./ViewContext";
import "../TableView.css";

const ListTable = () => {
  const setlist = useContext(ViewContext);
  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Card Name</th>
            <th>Card Type</th>
            <th>Mana Cost</th>
            <th>Set Name</th>
            <th>Rarity</th>
            <th>Card Status</th>
          </tr>
        </thead>
        <tbody>
          {setlist.map((set, key) => {
            return (
              <>
                {set.banned.map((card, key) => (
                  <tr>
                    <td>{card.card_name}</td>
                    <td>{card.card_type}</td>
                    <td>
                      <ManaCost mana_cost={card.card_cost} />
                    </td>
                    <td>{set.setname}</td>
                    <td >
                      <SetIcon set_id={card.card_set} css={card.rarity_css} />
                    </td>
                    <td>{card.card_status}</td>
                  </tr>
                ))}

                {set.limited.map((card, key) => (
                  <tr>
                    <td>{card.card_name}</td>
                    <td>{card.card_type}</td>
                    <td>
                      <ManaCost mana_cost={card.card_cost} />
                    </td>
                    <td>{set.setname}</td>
                    <td>
                      <SetIcon set_id={card.card_set} css={card.rarity_css} />
                    </td>
                    <td>{card.card_status}</td>
                  </tr>
                ))}
              </>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ListTable;
