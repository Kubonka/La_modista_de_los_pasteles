import React from "react";

function StyledLabel({ children }) {
  return (
    <div className="group flex w-auto cursor-pointer flex-col items-center justify-center">
      <p className="w-auto text-2xl font-bold text-white group-hover:text-pink-200 ">
        {children}
      </p>
      <div className="duration-250 h-1 w-0 rounded-full bg-white transition-width ease-in group-hover:w-full group-hover:bg-pink-200"></div>
    </div>
  );
}

export default StyledLabel;
