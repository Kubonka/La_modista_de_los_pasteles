import React, { useEffect } from "react";
import "../../styles/index.css";
import Footer from "../Footer/Footer.jsx";
import Header from "../Header/Header.jsx";
import BannerH from "../BannerH/BannerH";
import BannerB from "../BannerB/BannerB";
import Carrusel from "../Carrusel/Carrusel";
import { useDispatch, useSelector } from "react-redux";
import { getCake, getCarrousel } from "../../redux/cakeSlice";
const Home = () => {
  const dispatch = useDispatch();
  const carrousel1 = useSelector((state) => state.cake.carrousel1);
  const carrousel2 = useSelector((state) => state.cake.carrousel2);
  const carrousel3 = useSelector((state) => state.cake.carrousel3);
  useEffect(() => {
    dispatch(getCarrousel(1));
    dispatch(getCarrousel(2));
    dispatch(getCarrousel(3));
  }, []);
  return (
    <div>
      <Header />

      <BannerH />

      <BannerB />
      <Carrusel cakes={carrousel1} />
      <Carrusel cakes={carrousel2} />

      <BannerB />

      <Carrusel cakes={carrousel3} />
      <Footer />
    </div>
  );
};

export default Home;
