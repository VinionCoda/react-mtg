import LoginButtonRedirect from "./LoginButtonRedirect";
import LogoutButton from "./LogoutButton";
import HeaderStatus from "./HeaderStatus";

const HeaderUserWidget = () => {
  return (
    <div className="header--user">
<HeaderStatus /> <LoginButtonRedirect /> <LogoutButton />
    </div>
  )
}

export default HeaderUserWidget