import { Route, Routes } from "react-router-dom";
import TestUpload from "./Components/TestUpload/TestUpload";
import "./App.css";
import ManageCake from "./Components/DashBoard/ManageCake/ManageCake";

import TagsManager from "./Components/DashBoard/TagsManager/TagsManager";
import Home from "./Components/Home/Home";
import Landing from "./Components/Landing/Landing";
import Details from "./Components/Details/Details";
import Categories from "./Components/Categories/Categories";
import CakeManager from "./Components/DashBoard/CakeManager/CakeManager";
import CarrouselManager from "./Components/DashBoard/CarrouselManager/CarrouselManager";
import UsersManager from "./Components/DashBoard/UsersManager/UsersManager";
import DashBoard from "./Components/DashBoard/Dashboard";

function App() {
  return (
    <Routes>
      <Route
        exact
        path="/cakemanager"
        element={<DashBoard section={<CakeManager />} />}
      />
      <Route
        exact
        path="/tagsmanager"
        element={<DashBoard section={<TagsManager />} />}
      />
      <Route
        exact
        path="/usersmanager"
        element={<DashBoard section={<UsersManager />} />}
      />
      <Route
        exact
        path="/carrouselmanager"
        element={<DashBoard section={<CarrouselManager />} />}
      />
      <Route
        exact
        path="/managecake/:cake_id"
        element={<DashBoard section={<ManageCake />} />}
      />
      <Route exact path="/categories" element={<Categories />} />
      <Route exact path="/details/:cake_id" element={<Details />} />
      <Route exact path="/home" element={<Home />} />
      <Route exact path="/" element={<Landing />} />
    </Routes>
  );
}

export default App;
