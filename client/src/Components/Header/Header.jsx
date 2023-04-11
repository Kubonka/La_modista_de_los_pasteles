import React from 'react'
import logo from '../../images/logo1.png';
import { FaSearch } from 'react-icons/fa';

function Header() {
  return (

   <header className="flex items-center justify-center bg-gray-700 py-4 px-6">
   <div className="flex items-center">
      <img className="w-40 h-40 rounded-full" src={logo} alt='not found' />
     <h1 className="font-bold text-2xl text-pink-300 mx-16">Tortas</h1>
     <h1 className="font-bold text-2xl text-pink-300 mx-16">Mesa dulce</h1>
     <h1 className="font-bold text-2xl text-pink-300 mx-16">Categorías</h1>
     <div className="relative">
       <input
         type="text"
         className="border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
         placeholder="Buscar productos"
       />
       <button className="absolute right-0 top-0 mt-3 mr-4">
         <FaSearch className="text-gray-400" />
       </button>
     </div>
   </div>
 </header>
  )
}

export default Header;