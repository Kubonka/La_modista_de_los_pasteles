import React, { useRef, useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import {
  getAllTags,
  updateTag,
  createTag,
  deleteTag,
} from "../../../../redux/cakeSlice";
import { HiPencil, HiTrash, HiTag } from "react-icons/hi";
import swalManager from "../../../../scripts/swalManager";

function DisplayTags({ currentTags, loading }) {
  const dispatch = useDispatch();
  const selectedTag = useRef({});
  const [showModalNew, setShowModalNew] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [editTagInput, setEditTagInput] = useState("");

  //! Handlers
  async function handleAceptarBtn(modal) {
    try {
      let result;
      switch (modal) {
        case "modal1":
          result = await dispatch(
            updateTag({
              tag_id: selectedTag.current.tag_id,
              name: editTagInput,
            })
          ).unwrap();
          if (result.status === "SUCCESS") {
            dispatch(getAllTags());
            handleCloseModal("modal1");
            swalManager.success("Tag modificado con exito");
          } else {
            swalManager.error("Error al modificar el Tag");
            handleCloseModal("modal1");
          }
          break;
        case "modal2":
          //todo hacer dispatch del delete del selectedTag.current
          //todo handleCloseModal("modal2");
          result = await dispatch(deleteTag(selectedTag.current)).unwrap();
          if (result.status === "SUCCESS") {
            dispatch(getAllTags());
            handleCloseModal("modal2");
            swalManager.success("Tag eliminado con exito");
          } else {
            swalManager.error("Error al eliminar el Tag");
            handleCloseModal("modal2");
          }
          break;
        case "modal3":
          console.log("editTagInput", editTagInput);
          result = await dispatch(createTag({ name: editTagInput })).unwrap();
          if (result.status === "SUCCESS") {
            dispatch(getAllTags());
            handleCloseModal("modal3");
            swalManager.success("Tag creado con exito");
          } else {
            swalManager.error("Error al crear el Tag");
            handleCloseModal("modal3");
          }
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

  //! Markup
  return (
    <div>
      {/* //! MODAL 1 EDITAR TAG*/}
      <Modal
        isOpen={showModalEdit}
        onRequestClose={() => handleCloseModal("modal1")}
        className={
          "ml-[33%] mr-[33%] mt-40 flex flex-col items-center justify-center rounded-lg"
        }
      >
        <div className="pl-18 flex h-48 w-full flex-col items-center justify-between rounded-lg border-2 border-black bg-pink-200 p-4">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4 font-semibold">
              {`Ingrese un nuevo valor para el tag "${selectedTag.current.name}"`}
            </div>
            <div className="flex flex-row gap-2">
              <input
                type="text"
                name="editTagInput"
                id="editTagInput"
                maxLength={16}
                placeholder="Nuevo valor ..."
                onChange={(e) =>
                  e.target.value.length <= 16 && setEditTagInput(e.target.value)
                }
                className="rounded-md border-2  border-primary pl-4 font-semibold text-primary "
              />
              <p>{`${editTagInput.length}/16`}</p>
            </div>
          </div>
          <div className="flex flex-row gap-8 pl-[50%]">
            <button
              type="button"
              onClick={() => handleAceptarBtn("modal1")}
              className="h-8 w-24 rounded-md border-2 border-primary bg-primary font-semibold text-white hover:bg-pink-200  hover:text-primary"
            >
              Aceptar
            </button>
            <button
              type="button"
              onClick={() => handleCloseModal("modal1")}
              className="h-8 w-24 rounded-md border-2 border-primary bg-primary font-semibold text-white hover:bg-pink-200  hover:text-primary"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
      {/* //! MODAL 2  DELETE TAG */}
      <Modal
        isOpen={showModalDelete}
        onRequestClose={() => handleCloseModal("modal2")}
        className={
          "ml-[33%] mr-[33%] mt-40 flex flex-col items-center justify-center rounded-lg"
        }
      >
        <div className="pl-18 flex h-48 w-full flex-col items-center justify-between rounded-lg border-2 border-black bg-pink-200 p-4">
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
              className="h-8 w-24 rounded-md border-2 border-primary bg-primary font-semibold text-white hover:bg-pink-200  hover:text-primary"
            >
              Aceptar
            </button>
            <button
              type="button"
              onClick={() => handleCloseModal("modal2")}
              className="h-8 w-24 rounded-md border-2 border-primary bg-primary font-semibold text-white hover:bg-pink-200  hover:text-primary"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
      {/* //! MODAL 3 -> NEW TAG */}
      <Modal
        isOpen={showModalNew}
        onRequestClose={() => handleCloseModal("modal3")}
        className={
          "ml-[33%] mr-[33%] mt-40 flex flex-col items-center justify-center rounded-lg"
        }
      >
        <div className="pl-18 flex h-48 w-full flex-col items-center justify-between rounded-lg border-2 border-black bg-pink-200 p-4">
          <div className="flex flex-col items-center justify-center">
            <div className="mb-4 font-semibold">{`Ingrese nombre de tag`}</div>
            <div className="flex flex-row gap-2">
              <input
                type="text"
                name="newTagInput"
                id="newTagInput"
                placeholder="Nuevo valor ..."
                onChange={(e) =>
                  e.target.value.length <= 16 && setEditTagInput(e.target.value)
                }
                className="rounded-md border-2  border-primary pl-4 font-semibold text-primary "
              />
              <p>{`${editTagInput.length}/16`}</p>
            </div>
          </div>
          <div className="flex flex-row gap-8 pl-[50%]">
            <button
              type="button"
              onClick={() => handleAceptarBtn("modal3")}
              className="h-8 w-24 rounded-md border-2 border-primary bg-primary font-semibold text-white hover:bg-pink-200  hover:text-primary"
            >
              Aceptar
            </button>
            <button
              type="button"
              onClick={() => handleCloseModal("modal3")}
              className="h-8 w-24 rounded-md border-2 border-primary bg-primary font-semibold text-white hover:bg-pink-200  hover:text-primary"
            >
              Cancelar
            </button>
          </div>
        </div>
      </Modal>
      {/* //! COMPONENT */}
      <div className="flex flex-col items-center justify-center">
        <div
          className="group ml-56 flex h-12 w-44 cursor-pointer items-center justify-center gap-4 rounded-md border-2 border-primary bg-primary p-2 hover:bg-primaryHi"
          onClick={() => setShowModalNew(true)}
        >
          <div className="font-semibold text-white ">Agregar Tag</div>
          <HiTag className="mt-1 h-6 w-6 text-white" />
        </div>

        <table className="m-4 w-fit border-collapse border-4 border-black">
          <thead>
            <tr className="bg-gray-400 text-white">
              <th className="w-56 border-r-2 border-black px-1 py-2">
                Nombre del Tag
              </th>
              <th className="w-24 border-r-2 border-black py-2 pl-2">Editar</th>
              <th className="w-24 px-4 py-2 ">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {currentTags &&
              currentTags.map((tag) => {
                return (
                  <tr key={tag.tag_id} className="border-t border-gray-400">
                    <td className="border-r-2 border-black px-4 py-2 font-bold">
                      {tag.name}
                    </td>
                    <td className="border-r-2 border-black px-8 py-2">
                      <HiPencil
                        onClick={() => {
                          selectedTag.current = tag;
                          setShowModalEdit(true);
                        }}
                        className="h-8 w-8 cursor-pointer text-primary hover:text-pink-500"
                      />
                    </td>
                    <td className="border-r-2 border-black px-7 py-2">
                      <HiTrash
                        onClick={() => {
                          selectedTag.current = tag;
                          setShowModalDelete(true);
                        }}
                        className="h-8 w-8 cursor-pointer text-primary hover:text-pink-500"
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
