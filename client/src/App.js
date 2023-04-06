import { Route, Routes } from "react-router-dom";
import TestUpload from "./Components/TestUpload/TestUpload";
import "./App.css";

function App() {
  return (
    <div className="App">
      {"asd"}
      <Routes>
        <Route exact path="/testupload" element={<TestUpload />} />
      </Routes>
    </div>
  );
}

export default App;
