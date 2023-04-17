import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tag from "../TagsPanel/Tag/Tag";
import CardV from "../CardV/CardV";
import Pagination from "../Pagination/Pagination";
import { getAllCakes, removeFilteringBy } from "../../redux/cakeSlice";
import { HiTrash } from "react-icons/hi";
import usePagination from "../../scripts/usePagination";
function Categories() {
  const allCakes = useSelector((state) => state.cake.allCakes);
  const filteringBy = useSelector((state) => state.cake.filteringBy);
  const [inputs, setInputs] = useState({ search: "" });
  const [loading, setLoading] = useState(false);
  const [currentCakes, currentPage, setCakes, paginate] = usePagination(6);
  const totalCakes = useRef(0);
  const lastSearch = useRef("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCakes());
  }, []);

  useEffect(() => {
    let cakesToFilter = [...allCakes];
    filteringBy.forEach((filterTag) => {
      cakesToFilter = cakesToFilter.filter((cake) => {
        const tagFound = cake.Tags.find(
          (tag) => tag.tag_id === filterTag.tag_id
        );
        return tagFound ? true : false;
      });
    });
    totalCakes.current = cakesToFilter.length;
    setCakes(cakesToFilter);
  }, [allCakes, filteringBy]);

  function handleRemoveTag(tag) {
    dispatch(removeFilteringBy(tag.tag_id));
  }

  return (
    <div>
      <div>
        <div>Estas Viendo : </div>
        <div>
          {filteringBy &&
            filteringBy.map((tag) => {
              return (
                <div>
                  <Tag tag={tag} isClickable={false}></Tag>
                  <div onClick={() => handleRemoveTag(tag)}>
                    <HiTrash />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div>
        <div>
          {currentCakes &&
            currentCakes.map((cake) => (
              <CardV key={cake.cake_id} cake={cake} />
            ))}
        </div>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={6}
          totalItems={totalCakes.current}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default Categories;
