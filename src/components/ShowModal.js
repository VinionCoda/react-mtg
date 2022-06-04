import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const ShowModal = ({ settings, showItem, type, funct }) => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const { title, text, buttonlayout, arr, toggle, callback, callback2 } =
    settings;

  const flag = useAuth0().isAuthenticated;

  useEffect(() => {
    setData(arr);
    setShow(showItem);
  }, [arr, showItem]);

  if (type === "menu") {
    return (
      <>
        isAuthenticated
        {/* Modal provides confirmation after to saving*/}
        <Modal show={show} onHide={funct}>
          <Modal.Header closeButton>
            <Modal.Title>Menu </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup>
              <ListGroup.Item>
                <Link to="/">Home</Link>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                <Link to="/rules">Group Rules</Link>
              </ListGroup.Item>
              {flag ? (
                <>
                  <ListGroup.Item>
                    <Link to="/upload">Edit List</Link>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Link to="/unban">Unban Cards</Link>
                  </ListGroup.Item>
                </>
              ) : (
                ""
              )}
              <ListGroup.Item>
                <Link to="/download">Download List</Link>
              </ListGroup.Item>
            </ListGroup>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  return (
    <>
      {/* Modal provides confirmation after to saving*/}
      <Modal show={toggle} onHide={callback}>
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

ShowModal.defaultProps = {
  settings: {
    title: "",
    text: "",
    buttonlayout: "confirm",
    arr: [],
    priority: "primary",
    toggle: false,
    callback: "",
    callback2: "",
  },
  showItem: false,
  type: "",
  funct: () => {},
};

export default ShowModal;
