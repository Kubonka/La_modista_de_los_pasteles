import React from 'react'
import torta1 from '../../images/torta1.png'
import torta3 from '../../images/torta 3.png'

function BannerB() {
  return (
   
   <div className="bg-primary py-8 px-6">
   <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row items-center justify-between">
     <div className="md:w-1/2 mb-8 md:mb-0">
       <h3 className="text-xl font-bold text-white mb-4">Tortas personalizadas</h3>
       <p className="text-gray-200 text-sm mb-4">
         De todos tus equipos, superhéroes y más
       </p>
       <p className="text-gray-200 text-sm mb-6">Envíos a domicilio</p>
       <button className="bg-white text-secondary py-2 px-4 rounded-full font-bold">
         Ver más
       </button>
     </div>
     <div className=" flex md:w-1/2">
       <img className="h-40 w-50 py-2 px-4 rounded-full" src={torta1}/>
       <img className="h-40 w-50 rounded-full " src={torta3}/>
     </div>
   </div>
 </div>
  )
}

export default BannerB