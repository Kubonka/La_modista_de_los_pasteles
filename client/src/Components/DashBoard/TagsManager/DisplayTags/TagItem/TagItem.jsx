import React from "react";
import { HiPencil, HiTrash } from "react-icons/hi";

function TagItem({ tag, onEditClick, onDeleteClick }) {
  return (
    <div>
      <p>{tag.name}</p>
      <HiPencil onClick={() => onEditClick(tag)} />
      <HiTrash onClick={""} />
    </div>
  );
}

export default TagItem;
