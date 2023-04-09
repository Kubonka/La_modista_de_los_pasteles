import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCake } from "../../redux/cakeSlice";
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
    <div>
      Dashboard
      <button onClick={handleCreateCake}> CREATE CAKE </button>
      <button onClick={handleManageTags}> MANAGE TAGS </button>
    </div>
  );
}

export default Dashboard;
