import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCake } from "../../redux/cakeSlice";
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
    <div>
      Dashboard
      <button onClick={handleCreateCake}> CREATE CAKE </button>
      <button onClick={handleManageTags}> MANAGE TAGS </button>
    </div>
  );
}

export default Dashboard;
