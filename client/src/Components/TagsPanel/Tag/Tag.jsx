import React from "react";

function Tag({ tag, onClick }) {
  return <div onClick={() => onClick(tag)}>{tag.name}</div>;
}

export default Tag;
