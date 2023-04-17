import React, { useState, useEffect } from "react";

function usePagination(initialItemsPerPage) {
  console.log("RENDER");
  const [allItems, setAllItems] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [itemsPerPage] = useState(initialItemsPerPage);
  function paginate(number) {
    setCurrentPage(number);
  }
  function setItems(items) {
    setAllItems(items);
    setCurrentPage(1);
  }
  useEffect(() => {
    const indexOfLastPage = currentPage * itemsPerPage;
    const indexOfFirstPage = indexOfLastPage - itemsPerPage;
    setCurrentItems(allItems.slice(indexOfFirstPage, indexOfLastPage));
  }, [currentPage, allItems]);

  return [currentItems, currentPage, setItems, paginate];
}

export default usePagination;
