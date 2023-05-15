import React from "react";
import logo from "../../images/logo1.png";
import { FaSearch } from "react-icons/fa";
import voladito from "../../images/voladito5.png";

export default function Footer() {
  return (
    <div className="w-full flex-col">
      <div
        className="bg-repeat-x"
        style={{
          backgroundImage: `url(${voladito})`,
          width: "100%",
          height: "50px",
          transform: "translateY(25px)",
        }}
      />
      <footer className="flex w-full justify-between bg-gray-700 ">
        <div className="flex flex-col">
          <h4 className="mb-6 cursor-pointer font-bold text-white hover:text-pink-300">
            Sobre nosotros
          </h4>
          <h4 className="mb-6 cursor-pointer font-bold text-white hover:text-pink-300">
            Contacto
          </h4>
          <h4 className="mb-6 cursor-pointer font-bold text-white hover:text-pink-300">
            Tienda
          </h4>
        </div>
        <div className="items-center justify-center">
          <img className="h-40 w-40 rounded-full" src={logo} alt="not found" />
        </div>
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              className="h-8 rounded-full border-2 border-gray-300 bg-white px-5 pr-10 text-sm focus:outline-none"
              placeholder="Buscar"
            />
            <button className="absolute right-0 top-0 mr-2 mt-1">
              <FaSearch className="text-gray-400" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
