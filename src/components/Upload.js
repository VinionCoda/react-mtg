import Header from "./Header";
import Footer from "./Footer";
import BannedCardsForm from "./BannedCardsForm";
//import { useAuth0 } from "@auth0/auth0-react";
//import { useNavigate } from "react-router-dom";
import "../Upload.css";

const Upload = () => {

  return (
    <>
      <Header />
      <div className="body__container">
        {/* Main side bar */}

        <div id="side_bar" className="side_bar"></div>
        <div className="container">
          <BannedCardsForm />
        </div>
        <div id="side_bar" className="side_bar"></div>
      </div>
      <button id="myBtn" title="Go to top">
        Top
      </button>

      <Footer />
    </>
  );
};

export default Upload;
