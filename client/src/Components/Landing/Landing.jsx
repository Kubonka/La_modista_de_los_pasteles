import React from 'react';
import { Link } from "react-router-dom";
import "./Landing.scss";



export default function LandingPage() {
 
    return (
      
      <div className="maincontainer">
  
        <section id="top">
        <div className="Landing">
      <div className="topspace">
      </div>
      <div className="TextandButton">
  
        <div className="firsttext">
          <p className="Maintext">La Modista De Los Pasteles</p>
        </div>
  
       
  
        <div className="btncointainer">
          <Link to="/home">
            <button className="joinbtn">Las mejores tortas en un solo lugar</button>
          </Link>
        </div>
          
      </div>
          
    </div>
        </section>
        </div>
    )};