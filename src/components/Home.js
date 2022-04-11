import Header from "./Header";
import Footer from "./Footer";
import ViewTypeCards from "./ViewTypeCards";
import ViewTypeList from "./ViewTypeList";
import "../Page.css";

const Home = () => {
  return (
    <>
      <Header />
      <div>
        <div id="side_bar" className="side_bar"></div>

        <ViewTypeCards />
      </div>
      <button id="myBtn" title="Go to top">
        Top
      </button>
      <Footer />
    </>
  );
};
export default Home;
