import Header from "../functional/Header";
import Footer from "../functional/Footer";
import BannedCardsForm from "../functional/BannedCardsForm";
import "../../Upload.css";

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
