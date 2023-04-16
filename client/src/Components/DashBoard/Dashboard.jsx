import React, { useEffect, useState } from "react";
import CakeManager from "./CakeManager/CakeManager";
import TagsManager from "./TagsManager/TagsManager";
import CarrouselManager from "./CarrouselManager/CarrouselManager";

function Dashboard() {
  const [section, setSection] = useState({
    cakeManager: true,
    tagsManager: false,
    userManager: true,
    carrouselManager: false,
    manageCake: false,
  });

  function handleChange(e) {
    setSection((p) => {
      const aux = {};
      const keysArr = Object.keys(p);
      keysArr.forEach((key) => {
        aux[key] = false;
      });
      aux[e.target.id] = true;
      console.log("AUX", aux);
      return aux;
    });
  }

  useEffect(() => {}, []);

  return (
    <div className="flex flex-row h-screen bg-purple-200">
      <div className="flex flex-col bg-pink-200 w-1/4 justify-center items-center ">
        <div className="flex flex-col border-4 rounded-md border-black">
          <div
            id="cakeManager"
            onClick={handleChange}
            className="py-4 px-6 bg-pink-200 text-gray-600 hover:bg-gray-400 hover:text-gray-700 "
          >
            Administrar tortas
          </div>
          <div
            id="tagsManager"
            onClick={handleChange}
            className="py-4 px-6 bg-pink-200 text-gray-600 hover:bg-gray-400 hover:text-gray-700"
          >
            Administrar tags
          </div>
          <div
            id="carrouselManager"
            onClick={handleChange}
            className="py-4 px-6 bg-pink-200 text-gray-600 hover:bg-gray-400 hover:text-gray-700"
          >
            Administrar Carrusel
          </div>
          <div className="py-4 px-6 bg-pink-200 text-gray-600 hover:bg-gray-400 hover:text-gray-700">
            Administrar Usuarios
          </div>
        </div>
      </div>
      <div>
        {section.cakeManager && <CakeManager />}
        {section.tagsManager && <TagsManager />}
        {section.carrouselManager && <CarrouselManager />}
      </div>
    </div>
  );
}

export default Dashboard;
