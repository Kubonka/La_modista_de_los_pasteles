import React from "react";
import { HiPencil, HiTrash } from "react-icons/hi";

function TagItem({ tag, onEditClick, onDeleteClick }) {
  return (
    <div className="flex flex-row ">
      <div className="border-black border-2">{tag.name}</div>
      <HiPencil
        className="h-8 w-8 text-primary hover:text-pink-500 cursor-pointer border-black border-2"
        onClick={() => onEditClick(tag)}
      />
      <HiTrash
        className="h-8 w-8 text-primary hover:text-pink-500 cursor-pointer border-black border-2"
        onClick={() => onDeleteClick(tag)}
      />
    </div>
  );
}

export default TagItem;
