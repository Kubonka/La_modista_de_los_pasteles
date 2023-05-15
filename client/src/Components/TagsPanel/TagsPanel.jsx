import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tag from "./Tag/Tag";
import { setFilteringBy, toggleTagWiggle } from "../../redux/cakeSlice";
import { useNavigate } from "react-router-dom";
function TagsPanel({ tags, small }) {
  const dispatch = useDispatch();
  const filteringBy = useSelector((state) => state.cake.filteringBy);
  const navigate = useNavigate();
  function handleClick(tag) {
    let tagFound = filteringBy.find((ftag) => ftag.tag_id === tag.tag_id);
    if (!tagFound) {
      dispatch(setFilteringBy(tag));
      if (filteringBy.length === 0) navigate("/categories");
    } else {
      dispatch(toggleTagWiggle(tag));
      setTimeout(() => dispatch(toggleTagWiggle(tag)), 500);
    }
  }
  return (
    <div className="flex h-auto w-full flex-col items-center justify-center gap-2">
      {tags &&
        tags.map((tag) => {
          return (
            <Tag
              tag={tag}
              onClick={handleClick}
              isClickable={true}
              wiggle={false}
              small={small}
            />
          );
        })}
    </div>
  );
}

export default TagsPanel;
