import React, { useEffect, useState } from "react";

function TagsPagination({ tagsPerPage, totalTags, paginate, currentPage }) {
  const [current, SetCurrent] = useState(1);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalTags / tagsPerPage); i++) {
    pageNumbers.push(i);
  }
  useEffect(() => {}, []);
  return (
    <div>
      <ul>
        {pageNumbers.includes(currentPage - 1) && (
          <li key="0">
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
          <li key={pageNumbers.length}>
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

export default TagsPagination;
