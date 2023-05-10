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
    const tagFound = filteringBy.find((ftag) => ftag.tag_id === tag.tag_id);
    if (!tagFound) {
      dispatch(setFilteringBy(tag));
      if (filteringBy.length === 0) navigate("/categories");
    }
  }
  return (
    <div className="flex flex-col w-full h-40 bg-slate-600 items-center justify-center gap-4">
      {tags &&
        tags.map((tag) => {
          return <Tag tag={tag} pepe={handleClick} isClickable={true} />;
        })}
    </div>
  );
}

export default TagsPanel;
