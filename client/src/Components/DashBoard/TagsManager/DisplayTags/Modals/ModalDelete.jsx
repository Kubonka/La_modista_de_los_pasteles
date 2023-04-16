import React from "react";

function ModalDelete({ show, onSubmit, onCloseRequest }) {
  function handleOk() {
    onSubmit();
  }
  function handleCancel() {
    onCloseRequest();
  }

  if (show) {
    return (
      <div>
        <button onClick={handleOk}>OK</button>
        <button onClick={handleCancel}>CANCEL</button>
      </div>
    );
  }
}

export default ModalDelete;
