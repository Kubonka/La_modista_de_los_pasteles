import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tag from "../TagsPanel/Tag/Tag";
import CardV from "../CardV/CardV";
import Pagination from "../Pagination/Pagination";
import {
  clearFilteringBy,
  getAllCakes,
  removeFilteringBy,
} from "../../redux/cakeSlice";

import usePagination from "../../scripts/usePagination";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
function Categories() {
  const allCakes = useSelector((state) => state.cake.allCakes);
  const allCakesLoading = useSelector((state) => state.cake.allCakesLoading);
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
    <div className="flex h-full w-full flex-col items-center justify-center bg-pink-200">
      {/* //$ Container general */}
      <Header />
      {/* //$ Container de Cards */}
      <div className="m-2 flex w-[80%] flex-row items-start justify-start rounded-md border-2 border-black p-4">
        {/* //$ Label + boton*/}
        <div className="w-42 mb-2 mr-2 flex flex-col items-center justify-start border-2 border-black">
          <p className="mb-2 text-xl font-bold">Filtrando por : </p>
          <div
            className="flex w-32 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-primary bg-primary font-semibold text-white hover:bg-primaryHi hover:font-semibold"
            onClick={() => dispatch(clearFilteringBy())}
          >
            Quitar Filtros
          </div>
        </div>
        {/* //$ Tags */}
        <div className="flex flex-row flex-wrap items-start justify-start">
          {filteringBy &&
            filteringBy.map((tag) => {
              return (
                <div className="mb-4 mr-4 flex flex-row items-center justify-center">
                  <Tag
                    tag={tag}
                    isClickable={false}
                    onRemoveTag={handleRemoveTag}
                    wiggle={tag.wiggle}
                  />
                </div>
              );
            })}
        </div>
      </div>
      {/* //$ Container de Tortas + Pagination*/}
      {allCakesLoading ? (
        <p className="text-3xl font-extrabold">LOADING</p>
      ) : (
        <div className="m-2 w-full">
          <div className="mb-2 flex max-h-[1200px] w-full flex-row flex-wrap items-start justify-center gap-4 p-4">
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
      )}
      <Footer />
    </div>
  );
}

export default Categories;
