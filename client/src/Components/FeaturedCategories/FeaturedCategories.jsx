import React from "react";

function FeaturedCategories() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row m-2">
        <div className="w-72 h-36 bg-green-400 border-2 border-black ml-2 mr-2"></div>
        <div className="w-72 h-36 bg-green-400 border-2 border-black ml-2 mr-2"></div>
        <div className="w-72 h-36 bg-green-400 border-2 border-black ml-2 mr-2"></div>
      </div>
      <div className="flex flex-row  m-2">
        <div className="w-72 h-36 bg-green-400 border-2 border-black ml-2 mr-2"></div>
        <div className="w-72 h-36 bg-green-400 border-2 border-black ml-2 mr-2"></div>
        <div className="w-72 h-36 bg-green-400 border-2 border-black ml-2 mr-2"></div>
      </div>
    </div>
  );
}

export default FeaturedCategories;
