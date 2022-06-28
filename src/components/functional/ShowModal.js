import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const WarningModal = ({ settings }) => {
  const { title, text, toggle, data, cardlist, saveFunct, closeFunct } =
    settings;

  return (
    <Modal show={toggle} onHide={closeFunct}>
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
      <Modal.Footer>
        <Button variant="secondary" onClick={closeFunct}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            saveFunct(cardlist);
          }}
        >
          Remove Cards
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const DialogModal = ({ settings, callback }) => {
  const { title, text, toggle, data } = settings;

  return (
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
      <Modal.Footer>
        <Button variant="primary" onClick={callback}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const MenuModal = ({ show, funct }) => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? (
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
            <Link to="/rules">Group Rules</Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to="/upload">Edit List</Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to="/unban">Unban Cards</Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to="/download">Download List</Link>
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
    </Modal>
  ) : (
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
            <Link to="/rules">Group Rules</Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Link to="/download">Download List</Link>
          </ListGroup.Item>
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
};

const ShowModal = ({ settings, show, type, funct }) => {
  const [options, setOptions] = useState({
    type: "",
    title: "",
    text: "",
    data: [],
    toggle: false,
    callback: "",
  });

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setOptions(settings);
    setToggle(show);
  }, [settings, show]);

  if (type === "menu") {
    return <MenuModal show={toggle} funct={funct} />;
  }

  if (type === "alert") {
    return <DialogModal settings={options} callback={funct} />;
  }

  return <WarningModal settings={options} />;
};

export default ShowModal;
