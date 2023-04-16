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
    navigate(`/detail/${cake.cake_id}`);
  }
  if (Object.keys(cake).length > 0)
    return (
      <div>
        <div>
          <div></div>
          <div onClick={handleClick}>
            <img
              src={`http://localhost:3001/${
                cake.Images.filter((image) => image.mainImage)[0].name
              }`}
              alt={cake.cake_id}
            />
          </div>
          <div>
            <TagsPanel tags={cake.Tags} />
          </div>
        </div>
      </div>
    );
}

export default CardV;
