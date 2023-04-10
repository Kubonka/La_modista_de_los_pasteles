import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTags, createTag } from "../../../redux/cakeSlice";
import DisplayTags from "./DisplayTags/DisplayTags";
import TagsPagination from "./TagsPagination/TagsPagination";
import { HiPlus, HiSearch } from "react-icons/hi";
function TagsManager() {
  const allTags = useSelector((state) => state.cake.allTags);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({ name: "", search: "" });
  //pagination vars
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tagsPerPage, setTagsPerPage] = useState(3);
  const [currentTags, setCurrentTags] = useState([]);
  const totalTags = useRef(0);
  const lastSearch = useRef("");
  const indexOfLastTag = currentPage * tagsPerPage;
  const indexOfFirstTag = indexOfLastTag - tagsPerPage;
  console.log("currentPage", currentPage);
  console.log("currentTags", currentTags);
  useEffect(() => {
    dispatch(getAllTags());
  }, []);

  useEffect(() => {
    let aux = allTags.filter((tag) =>
      tag.name.toLowerCase().includes(inputs.search.toLowerCase())
    );
    totalTags.current = aux.length;
    setCurrentTags(aux.slice(indexOfFirstTag, indexOfLastTag));
    if (lastSearch.current !== inputs.search) {
      lastSearch.current = inputs.search;
      setCurrentPage(1);
    }
  }, [inputs.search, allTags, currentPage]);

  function handleInputChange(event) {
    setInputs((p) => {
      return { ...p, [event.target.name]: event.target.value };
    });
  }

  async function handleAddTag(e) {
    try {
      const result = await dispatch(createTag({ name: inputs.name })).unwrap();
      if (result.status === "SUCCESS") {
        dispatch(getAllTags());
      }
    } catch (error) {
      console.log(error);
    }
  }

  const paginate = (number) => {
    setCurrentPage(number);
  };

  return (
    <div>
      <div>
        <div>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search Tag"
            onChange={handleInputChange}
          />
          <div>
            <HiSearch />
          </div>
        </div>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Add tag"
          onChange={handleInputChange}
        />
        <div onClick={handleAddTag}>
          <HiPlus />
        </div>
      </div>
      <div>
        <DisplayTags currentTags={currentTags} loading={loading} />
        <TagsPagination
          tagsPerPage={tagsPerPage}
          totalTags={totalTags.current}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default TagsManager;
