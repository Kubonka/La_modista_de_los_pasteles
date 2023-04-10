import React from "react";
import "../../styles/index.css";

function Table() {
  return (
    <table className="w-full border-collapse border-4 border-black m-4">
      <thead>
        <tr className="bg-gray-700 text-white">
          <th className="py-2 px-4 border-r-2 border-black">Columna 1</th>
          <th className="py-2 px-4 border-r-2 border-black">Columna 2</th>
          <th className="py-2 px-4 border-r-2 border-black">Columna 3</th>
          <th className="py-2 px-4 border-r-2 border-black">Columna 4</th>
          <th className="py-2 px-4 border-r-2 border-black">Columna 5</th>
          <th className="py-2 px-4 border-r-2 border-black">Columna 6</th>
          <th className="py-2 px-4 border-r-2 border-black">Columna 7</th>
          <th className="py-2 px-4 border-r-2 border-black">Columna 8</th>
          <th className="py-2 px-4 border-r-2 border-black">Columna 9</th>
          <th className="py-2 px-4">Columna 10</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(10)].map((_, index) => (
          <tr key={index} className="border-t border-gray-400">
            <td className="py-2 px-4 border-r-2 border-black">
              Fila {index + 1}
            </td>
            <td className="py-2 px-4 border-r-2 border-black">
              Fila {index + 1}
            </td>
            <td className="py-2 px-4 border-r-2 border-black">
              Fila {index + 1}
            </td>
            <td className="py-2 px-4 border-r-2 border-black">
              Fila {index + 1}
            </td>
            <td className="py-2 px-4 border-r-2 border-black">
              Fila {index + 1}
            </td>
            <td className="py-2 px-4 border-r-2 border-black">
              Fila {index + 1}
            </td>
            <td className="py-2 px-4 border-r-2 border-black">
              Fila {index + 1}
            </td>
            <td className="py-2 px-4 border-r-2 border-black">
              Fila {index + 1}
            </td>
            <td className="py-2 px-4 border-r-2 border-black">
              Fila {index + 1}
            </td>
            <td className="py-2 px-4">Fila {index + 1}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
