import { Route, Routes } from "react-router-dom";
import TestUpload from "./Components/TestUpload/TestUpload";
import "./App.css";
import ManageCake from "./Components/DashBoard/ManageCake/ManageCake";
import Dashboard from "./Components/DashBoard/Dashboard";
import TagsManager from "./Components/DashBoard/TagsManager/TagsManager";
import Home from "./Components/Home/Home"
import Landing from "./Components/Landing/Landing"

function App() {
  return (
    <div className="App">
     
      <Routes>
        <Route exact path="/managecake/:cake_id" element={<ManageCake />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/managetags" element={<TagsManager />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
