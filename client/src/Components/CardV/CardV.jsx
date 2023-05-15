import React from "react";
import { useNavigate } from "react-router-dom";
import TagsPanel from "../TagsPanel/TagsPanel";
import { useDispatch } from "react-redux";
import { clearFilteringBy } from "../../redux/cakeSlice";
function CardV({ cake }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleClick() {
    dispatch(clearFilteringBy());
    navigate(`/details/${cake.cake_id}`);
  }
  if (Object.keys(cake).length > 0)
    return (
      <div className="flex h-[500px] w-[600px] flex-row rounded-lg border-2 border-gray-600 bg-pink-300">
        {/* //$ Imagen */}
        <div className="mb-2 h-full w-[75%] p-2" onClick={handleClick}>
          <img
            src={cake.Images.filter((image) => image.mainImage)[0].name}
            alt={cake.cake_id}
            className="h-full w-full cursor-pointer object-contain"
          ></img>
        </div>
        {/* //$ Panel de Tags */}
        <div className=" flex w-[25%] flex-col items-center justify-start border-l-2 border-dashed border-gray-600 pt-4">
          <TagsPanel tags={cake.Tags} small={true} wiggle={false} />
        </div>
      </div>
    );
}

export default CardV;
