import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTags, createTag } from "../../../redux/cakeSlice";
import DisplayTags from "./DisplayTags/DisplayTags";
import Pagination from "../../Pagination/Pagination";
import { HiPlus, HiSearch } from "react-icons/hi";
import usePagination from "../../../scripts/usePagination";
function TagsManager() {
  const allTags = useSelector((state) => state.cake.allTags);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({ name: "", search: "" });
  const [currentTags, currentPage, setTags, paginate] = usePagination(6);
  //pagination vars
  const [loading, setLoading] = useState(false);
  const lastSearch = useRef("");
  const filteredlength = useRef(0);

  useEffect(() => {
    dispatch(getAllTags());
  }, []);

  useEffect(() => {
    let aux = allTags.filter((tag) =>
      tag.name.toLowerCase().includes(inputs.search.toLowerCase())
    );
    filteredlength.current = aux.length;
    setTags(aux);
    if (lastSearch.current !== inputs.search) {
      lastSearch.current = inputs.search;
    }
  }, [inputs.search, allTags]);

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
        <Pagination
          itemsPerPage={6}
          totalItems={filteredlength.current}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default TagsManager;
