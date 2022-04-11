import Header from "./Header";
import Footer from "./Footer";

const Download = () => {
  return (
    <div>
      <Header />
      <body>
        <h1>Download</h1>

        <div className="container">
          <div id="side_bar" className="side_bar"></div>
          <div id="maincontainer" className="setcontainer"></div>
        </div>
        <button onclick="topFunction()" id="myBtn" title="Go to top">
          Top
        </button>
      </body>
      <Footer />
    </div>
  );
};

export default Download;
