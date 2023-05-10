import React from "react";
import SectionPanel from "./SectionPanel/SectionPanel";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function DashBoard({ section }) {
  const navigate = useNavigate();
  const location = useLocation();
  function handleSectionChange(url) {
    navigate(`/${url}`);
  }
  console.log(location.pathname);
  return (
    <div className="flex min-h-screen w-full flex-row items-center justify-center bg-pink-200 ">
      <div className="mt-24 flex min-h-screen w-1/5 items-start justify-center">
        <SectionPanel
          section={location.pathname}
          onChange={handleSectionChange}
        />
      </div>
      <div className="flex min-h-screen w-4/5 flex-col items-center justify-start p-2">
        {section}
      </div>
    </div>
  );
}

export default DashBoard;
