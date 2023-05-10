import React from "react";

function StyledLabel({ children }) {
  return (
    <div className="group w-auto flex flex-col items-center justify-center cursor-pointer">
      <p className="text-2xl font-bold w-auto text-white group-hover:text-red-500 ">
        {children}
      </p>
      <div className="h-1 w-0 rounded-full bg-white group-hover:w-full group-hover:bg-red-500 transition-width duration-250 ease-in"></div>
    </div>
  );
}

export default StyledLabel;
