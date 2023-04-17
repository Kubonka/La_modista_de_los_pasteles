import React, { useEffect, useState } from "react";

function Pagination({ itemsPerPage, totalItems, paginate, currentPage }) {
  const [current, SetCurrent] = useState(1);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  useEffect(() => {}, []);
  return (
    <div className="flex items-center justify-center">
      <ul className="flex">
        <li
          key="0"
          className={`${
            pageNumbers.includes(currentPage - 1) ? "" : "opacity-0"
          } mr-1`}
        >
          <input
            className=" bg-primary hover:bg-pink-200 hover:border-primary hover:border-2 hover:text-primary text-white font-bold py-2 px-4 rounded border-2 border-primary cursor-pointer"
            type="button"
            value="<"
            onClick={() => {
              paginate(currentPage - 1);
            }}
            disabled={!pageNumbers.includes(currentPage - 1)}
          ></input>
        </li>

        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className=" ml-1 mr-1"
          >
            <input
              type="button"
              value={number}
              className={`${
                number === currentPage
                  ? "bg-pink-500 hover:bg-pink-500 hover:border-primary hover:border-2 hover:text-white text-white border-2 border-primary"
                  : "cursor-pointer bg-primary hover:bg-pink-200 hover:border-primary hover:border-2 hover:text-primary text-white border-2 border-primary"
              } font-bold py-2 px-4 rounded`}
            ></input>
          </li>
        ))}

        <li
          className={`${
            pageNumbers.includes(currentPage + 1) ? "" : "opacity-0"
          } ml-1`}
          key={pageNumbers.length}
        >
          <input
            className=" bg-primary hover:bg-pink-200 hover:border-primary hover:border-2 hover:text-primary text-white font-bold py-2 px-4 rounded border-2 border-primary cursor-pointer"
            type="button"
            value=">"
            onClick={() => {
              paginate(currentPage + 1);
            }}
            disabled={!pageNumbers.includes(currentPage + 1)}
          ></input>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
