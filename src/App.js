
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Download from "./components/Download";
import Rules from "./components/Rules";
import Upload from "./components/Upload";


function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<Home/>} />
        <Route  path="/upload" element={<Upload/>} />
        <Route  path="/download" element={<Download/>} />
        <Route  path="/rules" element={<Rules/>} />   
      </Routes>
    </Router>
  );
}

export default App;
