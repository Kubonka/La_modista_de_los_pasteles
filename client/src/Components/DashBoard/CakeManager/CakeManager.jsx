import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCake, getAllCakes } from "../../../redux/cakeSlice";
import { useNavigate } from "react-router-dom";
import Pagination from "../../Pagination/Pagination";
import usePagination from "../../../scripts/usePagination";
import { HiCake, HiEye, HiEyeOff, HiPencil, HiTrash } from "react-icons/hi";
function CakeManager() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allCakes = useSelector((state) => state.cake.allCakes);
  const [currentCakes, currentPage, setCakes, paginate] = usePagination(5);
  const [inputs, setInputs] = useState({ search: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getAllCakes());
  }, []);

  useEffect(() => {
    setCakes(allCakes);
  }, [allCakes]);

  async function handleCreateCake(e) {
    try {
      const result = await dispatch(createCake()).unwrap();
      if (result.cake_id) {
        navigate(`/managecake/${result.cake_id}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mt-4">
      <div
        className=" group flex flex-row items-center justify-center ml-auto mr-4 bg-primary w-52 h-12 rounded-md cursor-pointer hover:bg-pink-200 border-primary border-2 "
        onClick={() => handleCreateCake()}
      >
        <div className="text-white font-bold mr-2 group-hover:text-primary cursor-pointer">
          AGREGAR TORTA
        </div>
        <HiCake className="h-8 w-8 text-white group-hover:text-primary cursor-pointer" />
      </div>
      <table className="w-fit border-collapse border-4 border-black m-4">
        <thead>
          <tr className="bg-gray-500 text-white">
            <th className="py-2 px-1 border-r-2 border-black">ID Torta</th>
            <th className="py-2 px-4 border-r-2 border-black">Descripcion</th>
            <th className="py-2 px-4 border-r-2 border-black">Publica</th>
            <th className="py-2 px-4 border-r-2 border-black">Editar</th>
            <th className="py-2 px-4">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {currentCakes &&
            currentCakes.map((cake) => {
              return (
                <tr key={cake.cake_id} className="border-t border-gray-400">
                  <td className="py-2 px-4 border-r-2 border-black">
                    {cake.cake_id}
                  </td>
                  <td className="py-2 px-4 border-r-2 border-black">
                    {cake.description}
                  </td>
                  <td className="py-2 px-7 border-r-2 border-black">
                    {cake.public ? (
                      <HiEye className="h-7 w-7 text-primary hover:text-pink-500 cursor-pointer" />
                    ) : (
                      <HiEyeOff className="h-7 w-7 text-primary hover:text-pink-500 cursor-pointer" />
                    )}
                  </td>
                  <td className="py-2 px-5 border-r-2 border-black">
                    <HiPencil className="h-8 w-8 text-primary hover:text-pink-500 cursor-pointer" />
                  </td>
                  <td className="py-2 px-7 border-r-2 border-black">
                    <HiTrash className="h-8 w-8 text-primary hover:text-pink-500 cursor-pointer" />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        itemsPerPage={5}
        totalItems={allCakes.length}
        paginate={paginate}
      />
    </div>
  );
}

export default CakeManager;

// import React, { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createCake, getAllCakes } from "../../../redux/cakeSlice";
// import { useNavigate } from "react-router-dom";
// import Pagination from "../../Pagination/Pagination";
// function CakeManager() {
//   const allCakes = useSelector((state) => state.cake.allCakes);
//   const [inputs, setInputs] = useState({ search: "" });
//   const [loading, setLoading] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [cakesPerPage, setCakesPerPage] = useState(5);
//   const [currentCakes, setCurrentCakes] = useState([]);
//   const totalCakes = useRef(0);
//   const lastSearch = useRef("");
//   const indexOfLastCake = currentPage * cakesPerPage;
//   const indexOfFirstCake = indexOfLastCake - cakesPerPage;

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(getAllCakes());
//   }, []);

//   useEffect(() => {
//     // let aux = allCakes.filter((tag) =>
//     //   tag.name.toLowerCase().includes(inputs.search.toLowerCase())
//     // );
//     //totalCakes.current = aux.length;
//     //setCurrentCakes(aux.slice(indexOfFirstCake, indexOfLastCake));
//     setCurrentCakes(allCakes.slice(indexOfFirstCake, indexOfLastCake));
//     if (lastSearch.current !== inputs.search) {
//       lastSearch.current = inputs.search;
//       setCurrentPage(1);
//     }
//     totalCakes.current = allCakes.length;
//     console.log("1");
//   }, [inputs.search, allCakes, currentPage]);

//   async function handleCreateCake(e) {
//     try {
//       const result = await dispatch(createCake()).unwrap();
//       if (result.cake_id) {
//         navigate(`/managecake/${result.cake_id}`);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   function paginate(number) {
//     setCurrentPage(number);
//   }
//   return (
//     <div>
//       <div>
//         <button onClick={() => handleCreateCake()}>AGREGAR TORTA</button>
//       </div>
//       <table className="w-full border-collapse border-4 border-black m-4">
//         <thead>
//           <tr className="bg-gray-700 text-white">
//             <th className="py-2 px-4 border-r-2 border-black">ID TORTA</th>
//             <th className="py-2 px-4 border-r-2 border-black">Descripcion</th>
//             <th className="py-2 px-4 border-r-2 border-black">Publica</th>
//             <th className="py-2 px-4 border-r-2 border-black">Editar</th>
//             <th className="py-2 px-4">Eliminar</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentCakes &&
//             currentCakes.map((cake) => {
//               return (
//                 <tr key={cake.cake_id} className="border-t border-gray-400">
//                   <td className="py-2 px-4 border-r-2 border-black">
//                     {" "}
//                     {cake.cake_id}
//                   </td>
//                   <td className="py-2 px-4 border-r-2 border-black">
//                     {" "}
//                     {cake.description}
//                   </td>
//                   <td className="py-2 px-4 border-r-2 border-black">
//                     {" "}
//                     {cake.public}
//                   </td>
//                   <td className="py-2 px-4 border-r-2 border-black">
//                     {" "}
//                     {"ICONO EDIT"}
//                   </td>
//                   <td className="py-2 px-4 border-r-2 border-black">
//                     {" "}
//                     {"ICONO DELETE"}
//                   </td>
//                 </tr>
//               );
//             })}
//         </tbody>
//       </table>
//       <Pagination
//         currentPage={currentPage}
//         itemsPerPage={cakesPerPage}
//         totalItems={totalCakes.current}
//         paginate={paginate}
//       />
//     </div>
//   );
// }

// export default CakeManager;
