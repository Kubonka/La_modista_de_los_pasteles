import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function TagsManager() {
  const allTags = useSelector((state) => state.cake.allTags);
  const dispatch = useDispatch();
  const [newTagInput, setNewTagInput] = useState({ name: "" });

  useEffect(() => {
    //dispatch();
  }, []);
  useEffect(() => {}, [allTags]);
  function handleChange(event) {
    setNewTagInput((p) => {
      return { ...p, [event.target.name]: event.target.value };
    });
  }
  function handleAddTag(e) {}
  return (
    <div>
      TagsManager
      <input
        type="text"
        name="name"
        id="name"
        placeholder="ADD NEW TAG"
        onChange={handleChange}
      />
      <button onClick={handleAddTag}>ADD TAG</button>
      <p>ALL TAGS :</p>
      <div></div>
    </div>
  );
}

export default TagsManager;
