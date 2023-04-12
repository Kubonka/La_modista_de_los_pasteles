import React from 'react'
import banner from '../../images/banner2.png'

function BannerH() {
  return (
    
     <div className="bg-pink-500 h-500 flex items-center justify-center">
     {/* <h2 className="text-white text-6xl font-bold">La modista de los pasteles</h2> */}
     <img src={banner} alt='not found' />
   </div>
  )
}

export default BannerH