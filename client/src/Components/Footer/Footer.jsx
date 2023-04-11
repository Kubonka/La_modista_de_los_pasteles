import React from 'react'
import logo from '../../images/logo1.png'
import { FaSearch } from 'react-icons/fa';

export default function Footer() {
  return (
    
<footer className="bg-gray-600 py-4 px-6 flex justify-between">
<div className="flex flex-col">
  <h4 className="font-bold text-white mb-6">Sobre nosotros</h4>
  <h4 className="font-bold text-white mb-6">Contacto</h4>
  <h4 className="font-bold text-white mb-6">Tienda</h4>
</div>
<div className='items-center justify-center'>
<img className='w-40 h-40 rounded-full' src={logo} alt='not found' />
</div>
<div className="flex items-center">
  <h4 className="font-bold text-gray-600 mr-2">Contacto</h4>
  
  <div className="relative">
    <input
      type="text"
      className="border-2 border-gray-300 bg-white h-8 px-5 pr-10 rounded-full text-sm focus:outline-none"
      placeholder="Buscar"
    />
    <button className="absolute right-0 top-0 mt-1 mr-2">
      <FaSearch className="text-gray-400" />
    </button>
  </div>
</div>
</footer>
  )
}

