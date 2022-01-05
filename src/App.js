import "./App.css";
import "./Form.css";
import "./Card.css";
import "./Page.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ViewSelector from "./components/ViewSelector";


function App() {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="side"></div>
        <div className="main">
          <ViewSelector />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
