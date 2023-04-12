import React from 'react';
import '../../styles/index.css'
import Footer from '../Footer/Footer.jsx';
import Header from '../Header/Header.jsx';
import BannerH from '../BannerH/BannerH';
import BannerB from '../BannerB/BannerB';
import Carrusel from '../Carrusel/Carrusel';


const Home = () => {
  return (
    <div>
      <Header/>
      
      <BannerH/>

       <BannerB/>
       
      <Carrusel/>

      <BannerB/>

      <Footer/>
      
    </div>
  )}

  export default Home;