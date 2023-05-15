import React from "react";
import logo from "../../images/logo1.png";
import StyledLabel from "./StyledLabel/StyledLabel";
import voladito from "../../images/voladito4.png";

function Header() {
  return (
    <div className="w-full flex-col">
      <header className="h-30 flex w-full flex-row items-center justify-center gap-20 bg-gray-700 ">
        <StyledLabel>Inicio</StyledLabel>
        <StyledLabel>Galería</StyledLabel>
        <div className="z-10 w-40">
          <img className="h-32 w-32 rounded-full" src={logo} alt="not found" />
        </div>
        <StyledLabel>Sobre mi</StyledLabel>
        <StyledLabel>Contacto</StyledLabel>
      </header>
      <div
        className="bg-repeat-x "
        style={{
          backgroundImage: `url(${voladito})`,
          width: "100%",
          height: "50px",
        }}
      />
    </div>
  );
}

export default Header;
