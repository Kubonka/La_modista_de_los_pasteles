import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCake } from "../../redux/cakeSlice";
import '../../styles/index.css';
import Table from "./Table";

function Dashboard() {
  const dispatch = useDispatch();
  const currentCake = useSelector((state) => state.cake.currentCake);
  const navigate = useNavigate();
  function handleCreateCake(e) {
    dispatch(createCake());
  }
  function handleManageTags(e) {
    navigate("/managetags");
  }
  useEffect(() => {
    if (currentCake && currentCake.cake_id)
      navigate(`/managecake/${currentCake.cake_id}`);
  }, [currentCake]);

  
  return (

    <div className="flex flex-row h-screen bg-purple-200">
    <div className="flex flex-col bg-pink-200 w-1/4 justify-center items-center ">

      <div className="flex flex-col border-4 rounded-md border-black">
      
      <a href="#" className="py-4 px-6 bg-pink-200 text-gray-600 hover:bg-gray-400 hover:text-gray-700 ">
        Administrar torta
      </a>
      <a href="#" className="py-4 px-6 bg-pink-200 text-gray-600 hover:bg-gray-400 hover:text-gray-700">
        Administrar tags
      </a>
      <a href="#" className="py-4 px-6 bg-pink-200 text-gray-600 hover:bg-gray-400 hover:text-gray-700">
        Administrar Carrusel
      </a>
      <a href="#" className="py-4 px-6 bg-pink-200 text-gray-600 hover:bg-gray-400 hover:text-gray-700">
        Administrar Usuarios
      </a>
      </div>
      
    </div>
    
    
    <Table />
  </div>
  
);
}

export default Dashboard;
