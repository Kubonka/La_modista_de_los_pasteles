import React, { useState } from "react";
import axios from "axios";
/*  Maintain a state
state = {
    name: '',
    price: '',
    selectedFile: null,
    filename: null
}

handleChange = (event) => {
    this.setState({
      name: document.getElementById('name').value,
      price: document.getElementById('price').value
    })
}

fileSelectedHandler = (event) => {
    let file = event.target.files[0].name;
    this.setState({
        selectedFile: event.target.files[0],
        filename: document.getElementById('file').value
    })
    console.log(file);
}

fileUploadHandler = (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('price', this.state.price);
    formData.append('filename', this.state.filename);
    formData.append('file', this.state.selectedFile);
  
    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
    
    axios.post("http://localhost:3000", formData, config)
        .then (res => {
            console.log(res.data);
            console.log(this.state.filename);
            console.log(formData);
        })
}
*/

function TestUpload() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    selectedFile: [],
    fileName: null,
  });
  const handleChange = (event) => {
    setFormData((p) => {
      return { ...p, [event.target.name]: event.target.value };
    });
  };
  const fileSelectedHandler = (event) => {
    let file = event.target.files[0].name;
    setFormData((p) => {
      return {
        ...p,
        selectedFile: [...event.target.files],
        fileName: event.target.value,
      };
    });
    console.log(formData.selectedFile);
  };

  const fileUploadHandler = (event) => {
    console.log(formData.selectedFile);
    event.preventDefault();
    let fData = new FormData();
    fData.append("name", formData.name);
    fData.append("price", formData.price);
    fData.append("filename", formData.fileName);
    for (const file of formData.selectedFile) {
      fData.append("file", file);
    }
    //fData.append("file", formData.selectedFile);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    axios
      .post("http://localhost:3001/testupload", fData, config)
      .then((res) => {
        console.log("res.data", res.data);
        console.log("formData.filename", formData.filename);
        console.log("fData", fData);
      });
  };

  return (
    <div>
      <form encType="multipart/form">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name of the product"
          onChange={handleChange}
        />
        <br />
        <input
          type="number"
          name="price"
          id="price"
          placeholder="Price"
          onChange={handleChange}
        />
        <br />
        <input
          type="file"
          name="file"
          id="file"
          multiple
          placeholder="Upload your file"
          onChange={fileSelectedHandler}
        />
        <br />
        <button type="submit" onClick={fileUploadHandler}>
          Add Products
        </button>
      </form>
    </div>
  );
}

export default TestUpload;
