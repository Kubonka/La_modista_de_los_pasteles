import React, { useRef, useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { getAllTags, updateTag } from "../../../../redux/cakeSlice";
import { HiPencil, HiTrash, HiTag } from "react-icons/hi";

function DisplayTags({ currentTags, loading }) {
  const dispatch = useDispatch();
  const selectedTag = useRef({});
  const [showModalNew, setShowModalNew] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [editTagInput, setEditTagInput] = useState("");
  async function handleModalEditSubmit(tag) {
    try {
    } catch (error) {}
  }

  async function handleAceptarBtn(modal) {
    try {
      switch (modal) {
        case "modal1":
          const result = await dispatch(
            updateTag({ id: selectedTag.current.tag_id, name: editTagInput })
          ).unwrap();
          if (result.status === "SUCCESS") {
            dispatch(getAllTags());
            handleCloseModal("modal1");
          }
          break;
        case "modal2":
          //todo hacer dispatch del delete del selectedTag.current
          //todo handleCloseModal("modal2");
          break;
        case "modal3":
          //todo hacer dispatch del create TAG con el valor de editTagInput
          //todo handleCloseModal("modal3")
          //hacer el dispatch despues del unwrap()
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleCloseModal(modal) {
    switch (modal) {
      case "modal1":
        setShowModalEdit(false);
        setEditTagInput("");
        break;
      case "modal2":
        setShowModalDelete(false);
        break;
      case "modal3":
        setShowModalNew(false);
        setEditTagInput("");
        break;
      default:
        break;
    }
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      {/* //! MODAL 1 */}
      <Modal
        isOpen={showModalEdit}
        onRequestClose={() => handleCloseModal("modal1")}
        className={
          "flex flex-col items-center justify-center mt-40 ml-[33%] mr-[33%] rounded-lg"
        }
      >
        <div className="flex flex-col pl-18 bg-pink-200 w-full h-48 rounded-lg p-4 items-center justify-between border-2 border-black">
          <div className="font-semibold">
            {`Ingrese un nuevo valor para el tag "${selectedTag.current.name}"`}
          </div>
          <input
            type="text"
            name="editTagInput"
            id="editTagInput"
            placeholder="Nuevo valor ..."
            onChange={(e) => setEditTagInput(e.target.value)}
            className="pl-4 rounded-md  border-primary border-2 font-semibold text-primary "
          />
          <div className="flex flex-row gap-8 pl-[50%]">
            <button
              type="button"
              onClick={() => handleAceptarBtn("modal1")}
              className="bg-primary w-24 h-8 rounded-md font-semibold text-white border-primary hover:bg-pink-200 hover:text-primary  border-2"
            >
              Aceptar
            </button>
            <button
              type="button"
              onClick={() => handleCloseModal("modal1")}
              className="bg-primary w-24 h-8 rounded-md font-semibold text-white border-primary hover:bg-pink-200 hover:text-primary  border-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
      {/* //! MODAL 2 */}
      <Modal
        isOpen={showModalDelete}
        onRequestClose={() => handleCloseModal("modal2")}
        className={
          "flex flex-col items-center justify-center mt-40 ml-[33%] mr-[33%] rounded-lg"
        }
      >
        <div className="flex flex-col pl-18 bg-pink-200 w-full h-48 rounded-lg p-4 items-center justify-between border-2 border-black">
          <div className="font-semibold">
            {`Desea eliminar el tag "${selectedTag.current.name}" ?`}
          </div>
          <div className="font-semibold">
            {`Todas las tortas que usen el tag  "${selectedTag.current.name}" se modificarán.`}
          </div>
          <div className="flex flex-row gap-8 pl-[50%]">
            <button
              type="button"
              onClick={() => handleAceptarBtn("modal2")}
              className="bg-primary w-24 h-8 rounded-md font-semibold text-white border-primary hover:bg-pink-200 hover:text-primary  border-2"
            >
              Aceptar
            </button>
            <button
              type="button"
              onClick={() => handleCloseModal("modal2")}
              className="bg-primary w-24 h-8 rounded-md font-semibold text-white border-primary hover:bg-pink-200 hover:text-primary  border-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
      {/* //! MODAL 3 */}
      <Modal
        isOpen={showModalNew}
        onRequestClose={() => handleCloseModal("modal3")}
        className={
          "flex flex-col items-center justify-center mt-40 ml-[33%] mr-[33%] rounded-lg"
        }
      >
        <div className="flex flex-col pl-18 bg-pink-200 w-full h-48 rounded-lg p-4 items-center justify-between border-2 border-black">
          <div className="font-semibold">{`Ingrese nombre de tag`}</div>
          <input
            type="text"
            name="newTagInput"
            id="newTagInput"
            placeholder="Nuevo valor ..."
            onChange={(e) => setEditTagInput(e.target.value)}
            className="pl-4 rounded-md  border-primary border-2 font-semibold text-primary "
          />
          <div className="flex flex-row gap-8 pl-[50%]">
            <button
              type="button"
              onClick={() => handleAceptarBtn("modal3")}
              className="bg-primary w-24 h-8 rounded-md font-semibold text-white border-primary hover:bg-pink-200 hover:text-primary  border-2"
            >
              Aceptar
            </button>
            <button
              type="button"
              onClick={() => handleCloseModal("modal3")}
              className="bg-primary w-24 h-8 rounded-md font-semibold text-white border-primary hover:bg-pink-200 hover:text-primary  border-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
      {/* //! COMPONENT */}
      <div className="flex flex-col items-center justify-center">
        <div
          className="group flex items-center justify-center border-2 gap-4 p-2 w-44 h-12 rounded-md border-primary cursor-pointer hover:bg-pink-200 bg-primary ml-56"
          onClick={() => setShowModalNew(true)}
        >
          <div className="font-semibold text-white group-hover:text-primary">
            Agregar Tag
          </div>
          <HiTag className="text-white group-hover:text-primary h-6 w-6 mt-1" />
        </div>

        <table className="w-fit border-collapse border-4 border-black m-4">
          <thead>
            <tr className="bg-gray-500 text-white">
              <th className="py-2 px-1 w-56 border-r-2 border-black">
                Nombre del Tag
              </th>
              <th className="py-2 pl-2 w-24 border-r-2 border-black">Editar</th>
              <th className="py-2 px-4 w-24 ">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {currentTags &&
              currentTags.map((tag) => {
                return (
                  <tr key={tag.tag_id} className="border-t border-gray-400">
                    <td className="py-2 px-4 border-r-2 border-black font-bold">
                      {tag.name}
                    </td>
                    <td className="py-2 px-8 border-r-2 border-black">
                      <HiPencil
                        onClick={() => {
                          selectedTag.current = tag;
                          setShowModalEdit(true);
                        }}
                        className="h-8 w-8 text-primary hover:text-pink-500 cursor-pointer"
                      />
                    </td>
                    <td className="py-2 px-7 border-r-2 border-black">
                      <HiTrash
                        onClick={() => {
                          selectedTag.current = tag;
                          setShowModalDelete(true);
                        }}
                        className="h-8 w-8 text-primary hover:text-pink-500 cursor-pointer"
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DisplayTags;
