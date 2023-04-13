import React, { useEffect, useState } from "react";

function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
  const [current, SetCurrent] = useState(1);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  useEffect(() => {}, []);
  return (
    <div>
      <ul>
        {pageNumbers.includes(currentPage - 1) && (
          <li key="0" style={{ margin: "0 5px" }}>
            <input
              type="button"
              value="PREV"
              onClick={() => {
                paginate(currentPage - 1);
              }}
            ></input>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number} onClick={() => paginate(number)}>
            <input type="button" value={number}></input>
          </li>
        ))}
        {pageNumbers.includes(currentPage + 1) && (
          <li style={{ margin: "0 5px" }} key={pageNumbers.length}>
            <input
              type="button"
              value="NEXT"
              onClick={() => {
                paginate(currentPage + 1);
              }}
            ></input>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Pagination;
