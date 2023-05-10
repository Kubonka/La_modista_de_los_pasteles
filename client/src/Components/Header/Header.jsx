import React from "react";
import logo from "../../images/logo1.png";
import StyledLabel from "./StyledLabel/StyledLabel";

function Header() {
  return (
    <header className="flex flex-row items-center justify-center h-40 w-full bg-gray-700 gap-20">
      <StyledLabel>Inicio</StyledLabel>
      <StyledLabel>Galería</StyledLabel>
      <div className="w-40 z-10">
        <img className=" w-32 h-32 rounded-full" src={logo} alt="not found" />
      </div>
      <StyledLabel>Sobre mi</StyledLabel>
      <StyledLabel>Contacto</StyledLabel>
    </header>
  );
}

export default Header;
