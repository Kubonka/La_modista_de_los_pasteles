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
    selectedFile: null,
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
        selectedFile: event.target.files[0],
        fileName: event.target.value,
      };
    });
    this.setState({
      selectedFile: event.target.files[0],
      fileName: document.getElementById("file").value,
    });
    console.log(file);
  };

  // const fileUploadHandler = (event) => {
  //   event.preventDefault();
  //   let formData = new FormData();
  //   formData.append("name", this.state.name);
  //   formData.append("price", this.state.price);
  //   formData.append("filename", this.state.filename);
  //   formData.append("file", this.state.selectedFile);

  //   const config = {
  //     headers: { "content-type": "multipart/form-data" },
  //   };

  //   axios.post("http://localhost:3001", formData, config).then((res) => {
  //     console.log(res.data);
  //     console.log(this.state.filename);
  //     console.log(formData);
  //   });
  // };

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
          placeholder="Upload your file"
          onChange={fileSelectedHandler}
        />
        <br />
        <button type="submit">Add Products</button>
      </form>
    </div>
  );
}

export default TestUpload;
