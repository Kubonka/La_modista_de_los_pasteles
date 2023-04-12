import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tag from "./Tag/Tag";
import { setFilteringBy } from "../../redux/cakeSlice";
import { useNavigate } from "react-router-dom";
function TagsPanel({ tags }) {
  const dispatch = useDispatch();
  const filteringBy = useSelector((state) => state.cake.filteringBy);
  const navigate = useNavigate();
  function handleClick(tag) {
    console.log("handle click tag", tag);
    const tagFound = filteringBy.find((ftag) => ftag.tag_id === tag.tag_id);
    if (!tagFound) {
      dispatch(setFilteringBy(tag));
      navigate("/categories");
    }
  }
  return (
    <div>
      {tags &&
        tags.map((tag) => {
          return <Tag tag={tag} onClick={handleClick} />;
        })}
    </div>
  );
}

export default TagsPanel;
