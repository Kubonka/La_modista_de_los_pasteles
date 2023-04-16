import React from "react";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "./Carrusel.scss";
import { useNavigate } from "react-router-dom";
import prev from '../../images/prev.png'

SwiperCore.use([Navigation]);

function Carrusel({ cakes }) {
  const navigate = useNavigate();
  return (
    <div className="swiper-container">
      <div className="swiper-wrapper">
        <Swiper
          spaceBetween={20}
          slidesPerView={5}
          slidesPerGroup={5}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          
          className="mySwiper"
        >
          {cakes &&
            cakes.map((cake) => (
              <SwiperSlide
                key={Math.random()}
                onClick={() => navigate(`/details/${cake.cake_id}`)}
              >
                <div className="imgcarru">
                <img
                  className=" h-carrouselSize"
                  src={`http://localhost:3001/${cake.image}`}
                  alt="Imagen 1"
                />
                </div>
              </SwiperSlide>
            ))}

          
          <div className="swiper-button-prev"  >
          <h5>«</h5>
          </div>
          <div className="swiper-button-next">
          <h5>»</h5>
          </div>
        </Swiper>
      </div>
    </div>
  );
}

export default Carrusel;
