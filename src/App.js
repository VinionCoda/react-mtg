
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import Download from "./components/Download";
import Rules from "./components/Rules";
import Upload from "./components/Upload";
import UnbanCard from "./components/UnbanCard";

function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<Home/>} />
        <Route  path="/upload" element={<Upload/>} />
        <Route  path="/unban" element={<UnbanCard/>} />
        <Route  path="/download" element={<Download/>} />
        <Route  path="/rules" element={<Rules/>} />  
        <Route
        path="*"
        element={<Navigate to="/" replace />}
    /> 
      </Routes>
    </Router>
  );
}

export default App;
