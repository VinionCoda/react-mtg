import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlogger} from "@fortawesome/free-brands-svg-icons";
import { faCopyright} from "@fortawesome/free-regular-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <span>Cleaver MTG Club</span> <br />
      <span>Arklight Dev</span> {" "} <FontAwesomeIcon icon={faCopyright} /> {"2022"}
      <br />
      <FontAwesomeIcon icon={faBlogger} />
    </footer>
  );
};

export default Footer;
