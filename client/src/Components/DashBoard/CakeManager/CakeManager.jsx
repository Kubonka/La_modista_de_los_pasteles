import React, { useEffect, useState } from "react";
import { HiCake, HiEye, HiEyeOff, HiPencil, HiTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCake, deleteCake, getAllCakes } from "../../../redux/cakeSlice";
import swalManager from "../../../scripts/swalManager";
import usePagination from "../../../scripts/usePagination";
import Pagination from "../../Pagination/Pagination";
function CakeManager() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allCakes = useSelector((state) => state.cake.allCakes);
  const allCakesLoading = useSelector((state) => state.cake.allCakesLoading);
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
  async function handleDeleteCake(cake) {
    console.log(cake);
    const swalResponse = await swalManager.question(
      "Desea eliminar la torta ?"
    );
    if (swalResponse.isConfirmed) {
      const result = await dispatch(deleteCake(cake.cake_id)).unwrap();
      if (result === "SUCCESS") {
        swalManager.success("Torta eliminada con exito");
        dispatch(getAllCakes());
      } else {
        swalManager.error("Error al eliminar la torta");
      }
    }
  }
  if (allCakesLoading) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-2xl font-extrabold">LOADING</p>
      </div>
    );
  } else {
    return (
      <>
        <div
          className="group flex h-12 w-52 cursor-pointer flex-row items-center justify-center rounded-md border-2 border-primary bg-primary hover:bg-primaryHi"
          onClick={() => handleCreateCake()}
        >
          <div className="mr-2 cursor-pointer font-bold text-white">
            AGREGAR TORTA
          </div>
          <HiCake className="h-8 w-8 cursor-pointer text-white" />
        </div>
        <table className="m-4 w-fit border-collapse border-4 border-black">
          <thead>
            <tr className="bg-gray-400 text-white">
              <th className="border-r-2 border-black px-1 py-2">ID Torta</th>
              <th className="border-r-2 border-black px-4 py-2">Publica</th>
              <th className="border-r-2 border-black px-4 py-2">Descripcion</th>
              <th className="border-r-2 border-black px-4 py-2">Tags</th>
              <th className="border-r-2 border-black px-4 py-2">Editar</th>
              <th className="px-4 py-2">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {currentCakes &&
              currentCakes.map((cake) => {
                return (
                  <tr key={cake.cake_id} className="border-t border-gray-400">
                    <td className="border-r-2 border-black px-4 py-2 text-center">
                      {cake.cake_id}
                    </td>
                    <td className="border-r-2 border-black px-7 py-2">
                      {cake.public ? (
                        <HiEye className="h-7 w-7 text-primary " />
                      ) : (
                        <HiEyeOff className="h-7 w-7 text-primary " />
                      )}
                    </td>
                    <td className="border-r-2 border-black px-4 py-2 text-center">
                      {cake.description}
                    </td>
                    <td className="w-[15%] border-r-2 border-black px-4 py-2 text-center">
                      {cake.Tags.map((tag) => (
                        <p className="text-black">{tag.name}</p>
                      ))}
                    </td>
                    <td className="border-r-2 border-black px-6 py-2">
                      <HiPencil
                        onClick={() => navigate(`/managecake/${cake.cake_id}`)}
                        className="h-8 w-8 cursor-pointer text-primary hover:text-pink-500"
                      />
                    </td>
                    <td className="border-r-2 border-black px-8 py-2">
                      <HiTrash
                        onClick={() => handleDeleteCake(cake)}
                        className="h-8 w-8 cursor-pointer text-primary hover:text-pink-500"
                      />
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
      </>
    );
  }
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
