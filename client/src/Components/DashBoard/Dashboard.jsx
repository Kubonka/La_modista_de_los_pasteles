import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCake } from "../../redux/cakeSlice";
import '../../styles/index.css';
import Table from "./Table";

import Table from "./Table";
import "../../styles/index.css";
function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleCreateCake(e) {
    try {
      const result = await dispatch(createCake()).unwrap();
      if (result.cake_id) {
        navigate(`/managecake/${result.cake_id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function handleManageTags(e) {
    navigate("/managetags");
  }

  return (
    <div className="flex flex-row h-screen bg-purple-200">
      <div className="flex flex-col bg-pink-200 w-1/4 justify-center items-center ">
        <div className="flex flex-col border-4 rounded-md border-black">
          <a
            onClick={handleCreateCake}
            href="#"
            className="py-4 px-6 bg-pink-200 text-gray-600 hover:bg-gray-400 hover:text-gray-700 "
          >
            Administrar torta
          </a>
          <a
            href="#"
            className="py-4 px-6 bg-pink-200 text-gray-600 hover:bg-gray-400 hover:text-gray-700"
          >
            Administrar tags
          </a>
          <a
            href="#"
            className="py-4 px-6 bg-pink-200 text-gray-600 hover:bg-gray-400 hover:text-gray-700"
          >
            Administrar Carrusel
          </a>
          <a
            href="#"
            className="py-4 px-6 bg-pink-200 text-gray-600 hover:bg-gray-400 hover:text-gray-700"
          >
            Administrar Usuarios
          </a>
        </div>
      </div>

      <Table />
    </div>
    
    
    <Table />
  </div>
  
);
}

export default Dashboard;
