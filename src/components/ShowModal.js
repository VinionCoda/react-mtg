import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const ShowModal = ({ settings }) => {
  const [data, setData] = useState([]);
  const { title, text, buttonlayout, arr, toogle, callback, callback2 } =
    settings;

  useEffect(() => {
    setData(arr);
  }, [arr]);

  return (
    <>
      {/* Modal provides confirmation after to saving*/}
      <Modal show={toogle} onHide={callback}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> {text}</p>
          <ul>
            {data.map((item, key) => (
              <li key={key}>{item.card_name}</li>
            ))}
          </ul>
        </Modal.Body>
        {buttonlayout === "confirm" ? (
          <Modal.Footer>
            <Button variant="secondary" onClick={callback}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                callback2(data);
              }}
            >
              Remove Cards
            </Button>
          </Modal.Footer>
        ) : (
          <Modal.Footer>
            <Button variant="primary" onClick={callback}>
              Close
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default ShowModal;
