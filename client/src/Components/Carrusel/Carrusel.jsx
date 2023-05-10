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
                key={Math.random()}
                onClick={() => navigate(`/details/${cake.cake_id}`)}
              >
                <img
                  className=" h-carrouselSize"
                  src={cake.image}
                  alt="Imagen 1"
                />
              </SwiperSlide>
            ))}
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </Swiper>
      </div>
    </div>
  );
}

export default Carrusel;
