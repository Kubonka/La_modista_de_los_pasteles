import React, { useRef, useState } from "react";
import TagItem from "./TagItem/TagItem";
import ModalEdit from "./Modals/ModalEdit";
import ModalDelete from "./Modals/ModalDelete";
import { useDispatch } from "react-redux";
import { getAllTags, updateTag } from "../../../../redux/cakeSlice";

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
  function handleDeleteClick(tag) {
    selectedTag.current = tag;
    setShowModalDelete(true);
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <ModalEdit
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
      />
      <ul>
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
      </ul>
    </div>
  );
}

export default DisplayTags;
