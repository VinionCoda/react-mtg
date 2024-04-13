import React from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import LoginStatus from "./LoginStatus";

const SideBarUserWidget = () => {
  return (
    <div className="user_widget" >
      <LoginStatus />
      <LoginButton />
      <LogoutButton />
    </div>
  );
};

export default SideBarUserWidget;
