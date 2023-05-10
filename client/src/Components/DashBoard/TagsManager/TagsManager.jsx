import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTags, createTag } from "../../../redux/cakeSlice";
import DisplayTags from "./DisplayTags/DisplayTags";
import Pagination from "../../Pagination/Pagination";
import { HiSearch } from "react-icons/hi";
import usePagination from "../../../scripts/usePagination";
function TagsManager() {
  const allTags = useSelector((state) => state.cake.allTags);
  const allTagsLoading = useSelector((state) => state.cake.allTagsLoading);
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

  if (allTagsLoading) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-2xl font-extrabold">LOADING</p>
      </div>
    );
  } else {
    return (
      <>
        <div className="flex flex-row  items-center justify-center  ">
          <div className="flex flex-row  h-12 w-44 rounded-md absolute mr-56 mt-12">
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Buscar Tag"
              onChange={handleInputChange}
              className="pl-4 rounded-md  border-primary border-2 font-semibold text-primary "
            />
            <div className="flex items-center justify-center">
              <HiSearch className="w-6 h-6 absolute -translate-x-6 text-gray-400" />
            </div>
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
      </>
    );
  }
}

export default TagsManager;
