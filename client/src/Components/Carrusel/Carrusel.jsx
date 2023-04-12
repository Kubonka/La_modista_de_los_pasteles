import React from 'react';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import './Carrusel.scss';
import imagen from '../../images/torta1.png';
import imagen2 from '../../images/torta2.png';
import imagen3 from '../../images/torta3.png';
import imagen4 from '../../images/torta4.png';

SwiperCore.use([Navigation]);


function Carrusel() {
    return (
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <Swiper
            spaceBetween={30}
            slidesPerView={5}
            navigation
            className="mySwiper"
          >
            <SwiperSlide>
              <img src={imagen} alt="Imagen 1" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={imagen2} alt="Imagen 2" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={imagen3} alt="Imagen 3" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={imagen4} alt="Imagen 4" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={imagen} alt="Imagen 5" />
            </SwiperSlide>

            <SwiperSlide>
              <img src={imagen} alt="Imagen 1" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={imagen2} alt="Imagen 2" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={imagen3} alt="Imagen 3" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={imagen4} alt="Imagen 4" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={imagen} alt="Imagen 5" />
            </SwiperSlide>
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </Swiper>
        </div>
      </div>
    );
  }

  export default Carrusel;