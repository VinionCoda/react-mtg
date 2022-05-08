import Header from "./Header";
import Footer from "./Footer";

// Download list page
const Download = () => {


  return (
    <>
      <Header />
      <h1>Download</h1>
      <div className="container">
        <div id="side_bar" className="side_bar"></div>
        <div id="maincontainer" className="setcontainer"></div>
      </div>
      <button id="myBtn" title="Go to top">
        Top
      </button>
      <Footer />
    </>
  );
};

export default Download;
