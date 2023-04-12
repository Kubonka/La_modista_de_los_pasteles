import React from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "./Carrusel.scss";
import { useNavigate } from "react-router-dom";
SwiperCore.use([Navigation]);

function Carrusel({ cakes }) {
  const navigate = useNavigate();
  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        <Swiper
          spaceBetween={30}
          slidesPerView={3}
          slidesPerGroup={15}
          navigation
          className="mySwiper"
        >
          {cakes &&
            cakes.map((cake) => (
              <SwiperSlide
                key={cake.cake_id}
                onClick={() => navigate(`/details/${cake.cake_id}`)}
              >
                <img
                  src={`http://localhost:3001/${cake.image}`}
                  alt="Imagen 1"
                />
              </SwiperSlide>
            ))}

          {/* <SwiperSlide>
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
            </SwiperSlide> */}
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </Swiper>
      </div>
    </div>
  );
}

export default Carrusel;
