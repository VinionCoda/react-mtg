import React from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import LoginStatus from "./LoginStatus";
import { ListGroup} from "react-bootstrap";


const SideBarUserWidget = () => {
  return (
    <div style ={{width:"100%"}} >
      <ListGroup as="ul" >
        <ListGroup.Item as="li" style={{textAlign:"center"}}>
          <LoginStatus />
        </ListGroup.Item>
        <ListGroup.Item as="li" style={{textAlign:"center"}}>
          <LoginButton /> <LogoutButton />
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default SideBarUserWidget;
