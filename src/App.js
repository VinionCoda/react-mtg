
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/page/Home";
import Download from "./components/page/Download";
import Rules from "./components/page/Rules";
import Upload from "./components/page/Upload";
import UnbanCard from "./components/page/UnbanCard";
import Test from "./components/page/Test";

function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<Home/>} />
        <Route  path="/upload" element={<Upload/>} />
        <Route  path="/unban" element={<UnbanCard/>} />
        <Route  path="/download" element={<Download/>} />
        <Route  path="/rules" element={<Rules/>} />  
        <Route  path="/test" element={<Test/>} />  
        <Route
        path="*"
        element={<Navigate to="/" replace />}
    /> 
      </Routes>
    </Router>
  );
}

export default App;
