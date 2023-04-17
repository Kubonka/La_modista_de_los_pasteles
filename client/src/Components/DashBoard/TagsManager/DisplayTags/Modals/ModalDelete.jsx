import React from "react";

function ModalDelete({ show, onSubmit, selectedTag, onCloseRequest }) {
  function handleOk() {
    onSubmit();
  }
  function handleCancel() {
    onCloseRequest();
  }

  if (show) {
    return (
      <div className="bg-black text-white">
        <button onClick={handleOk}>OK</button>
        <button onClick={handleCancel}>CANCEL</button>
      </div>
    );
  }
}

export default ModalDelete;
