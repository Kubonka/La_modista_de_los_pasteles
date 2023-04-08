import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigation = useNavigate();
  function handleCreateCake(e) {
    navigation.navigate("/manage/1");
  }
  function handleManageTags(e) {
    navigation.navigate("/managetags");
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
