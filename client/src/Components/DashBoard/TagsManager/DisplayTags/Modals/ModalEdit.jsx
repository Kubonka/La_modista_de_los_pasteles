import React, { useState } from "react";

function ModalEdit({ show, onSubmit, onCloseRequest }) {
  const [name, setName] = useState("");
  function handleChange(e) {
    setName(e.target.value);
  }
  function handleOk() {
    onSubmit(name);
  }
  function handleCancel() {
    onCloseRequest();
  }

  if (show) {
    return (
      <div>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Edit Tag"
          onChange={handleChange}
        />
        <button onClick={handleOk}>OK</button>
        <button onClick={handleCancel}>CANCEL</button>
      </div>
    );
  }
}

export default ModalEdit;
