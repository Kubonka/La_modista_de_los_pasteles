import React, { useRef, useState } from "react";
import TagItem from "./TagItem/TagItem";
import Modal from "react-modal";
import ModalEdit from "./Modals/ModalEdit";
import ModalDelete from "./Modals/ModalDelete";
import { useDispatch } from "react-redux";
import { getAllTags, updateTag } from "../../../../redux/cakeSlice";
import { HiPencil, HiTrash } from "react-icons/hi";

function DisplayTags({ currentTags, loading }) {
  const dispatch = useDispatch();
  const selectedTag = useRef({});
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  async function handleModalEditSubmit(tag) {
    try {
      const result = await dispatch(updateTag(tag)).unwrap();
      if (result.status === "SUCCESS") {
        dispatch(getAllTags());
      }
    } catch (error) {
      console.log(error);
    }
  }
  function handleModalDeleteSubmit() {}
  function handleEditClick(tag) {
    selectedTag.current = tag;
    setShowModalEdit(true);
  }
  function handleDeleteOk(tag) {
    selectedTag.current = tag;
    handleCloseModal("modal2");
  }

  function handleCloseModal(modal) {
    if (modal === "modal1") {
      setShowModalEdit(false);
    } else if (modal === "modal2") {
      setShowModalDelete(false);
    }
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <Modal
        isOpen={showModalEdit}
        onRequestClose={() => handleCloseModal("modal1")}
      ></Modal>
      <Modal
        isOpen={showModalDelete}
        onRequestClose={() => handleCloseModal("modal2")}
      >
        <div>Estas seguro que desea eliminar el tag ? </div>
        <button type="button" onClick={handleDeleteOk}>
          OK
        </button>
        <button type="button" onClick={() => handleCloseModal("modal2")}>
          CANCEL
        </button>
      </Modal>
      {/* <ModalEdit
        show={showModalEdit}
        selectedTag={selectedTag}
        onSubmit={handleModalEditSubmit}
        onCloseRequest={() => setShowModalEdit(false)}
      />
      <ModalDelete
        show={showModalDelete}
        selectedTag={selectedTag}
        onSubmit={handleModalDeleteSubmit}
        onCloseRequest={() => setShowModalDelete(false)}
      /> */}
      <div className="flex items-center justify-center">
        <table className="w-fit border-collapse border-4 border-black m-4">
          <thead>
            <tr className="bg-gray-500 text-white">
              <th className="py-2 px-1 border-r-2 border-black">Tag Name</th>
              <th className="py-2 px-4 border-r-2 border-black">Editar</th>
              <th className="py-2 px-4">Eliminar</th>
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
                    <td className="py-2 px-5 border-r-2 border-black">
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
      {/* <ul>
        {currentTags &&
          currentTags.map((tag) => {
            return (
              <li key={tag.tag_id}>
                <TagItem
                  tag={tag}
                  onEditClick={handleEditClick}
                  onDeleteClick={handleDeleteClick}
                />
              </li>
            );
          })}
      </ul> */}
    </div>
  );
}

export default DisplayTags;
