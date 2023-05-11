import React from "react";
import logo from "../../images/logo1.png";
import { FaSearch } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex w-full justify-between bg-gray-400 px-6 py-4">
      <div className="flex flex-col">
        <h4 className="mb-6 font-bold text-white">Sobre nosotros</h4>
        <h4 className="mb-6 font-bold text-white">Contacto</h4>
        <h4 className="mb-6 font-bold text-white">Tienda</h4>
      </div>
      <div className="items-center justify-center">
        <img className="h-40 w-40 rounded-full" src={logo} alt="not found" />
      </div>
      <div className="flex items-center">
        <h4 className="mr-2 font-bold text-gray-600">Contacto</h4>

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
  );
}
