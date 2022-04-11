import Header from "./Header";
import Footer from "./Footer";
import BannedCardsForm from "./BannedCardsForm";

const Upload = () => {
  return (
    <>
      <Header />
  
        <div className="container--text">
          <div id="side_bar" className="side_bar"></div>
          <div id="maincontainer" className="uploadcontainer">

            <BannedCardsForm />


          </div>
        </div>
        <button onclick="topFunction()" id="myBtn" title="Go to top">
          Top
        </button>

      <Footer />
    </>
  );
};

export default Upload;
