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
    <div className="flex flex-row h-screen w-full bg-pink-200">
      <div className="flex flex-col bg-pink-200 w-1/5 justify-center items-center border-r-2 border-black">
        <div className="flex flex-col border-4 rounded-md border-black">
          <div
            id="cakeManager"
            onClick={handleChange}
            //className="py-4 px-6 bg-primary text-white hover:bg-pink-200 hover:text-primary font-semibold "
            className={
              section.cakeManager
                ? `py-4 px-6 bg-pink-500 text-white hover:bg-pink-500 hover:text-white font-semibold`
                : `cursor-pointer py-4 px-6 bg-primary text-white hover:bg-pink-200 hover:text-primary font-semibold`
            }
          >
            Administrar Tortas
          </div>
          <div
            id="tagsManager"
            onClick={handleChange}
            className={
              section.tagsManager
                ? `py-4 px-6 bg-pink-500 text-white hover:bg-pink-500 hover:text-white font-semibold`
                : `cursor-pointer py-4 px-6 bg-primary text-white hover:bg-pink-200 hover:text-primary font-semibold`
            }
          >
            Administrar Tags
          </div>
          <div
            id="carrouselManager"
            onClick={handleChange}
            className={
              section.carrouselManager
                ? `py-4 px-6 bg-pink-500 text-white hover:bg-pink-500 hover:text-white font-semibold`
                : `cursor-pointer py-4 px-6 bg-primary text-white hover:bg-pink-200 hover:text-primary font-semibold`
            }
          >
            Administrar Carrusel
          </div>
          <div
            className={
              section.userManager
                ? `py-4 px-6 bg-pink-500 text-white hover:bg-pink-500 hover:text-white font-semibold`
                : `cursor-pointer py-4 px-6 bg-primary text-white hover:bg-pink-200 hover:text-primary font-semibold`
            }
          >
            Administrar Usuarios
          </div>
        </div>
      </div>
      <div className="w-4/5">
        {section.cakeManager && <CakeManager />}
        {section.tagsManager && <TagsManager />}
        {section.carrouselManager && <CarrouselManager />}
      </div>
    </div>
  );
}

export default Dashboard;
