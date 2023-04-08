import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCake, updateCake } from "../../../redux/cakeSlice";
import axios from "axios";

function ManageCake() {
  const { cake_id } = useParams();
  const dispatch = useDispatch();
  const currentCake = useSelector((state) => state.cake.currentCake);
  const currentCakeLoading = useSelector(
    (state) => state.cake.currentCakeLoading
  ); //todo manejar loading animations
  const [formData, setFormData] = useState({});
  const imagesLoaded = useRef([]);
  useEffect(() => {
    console.log("cake_id", cake_id);
    dispatch(getCake(cake_id));
    //todo dispatch(getAllTags()) COMPONENTIZAR
  }, []);
  useEffect(() => {
    setFormData({ ...currentCake });
    console.log("currentCake ue", currentCake);
    imagesLoaded.current = [];
    console.log(currentCakeLoading);
  }, [currentCake]);

  const handleChange = (event) => {
    setFormData((p) => {
      return { ...p, [event.target.name]: event.target.value };
    });
  };

  const fileSelectedHandler = (event) => {
    imagesLoaded.current = [...event.target.files];
    fileUploadHandler(event);
    //let file = event.target.files[0].name;
    // setFormData((p) => {
    //   return {
    //     ...p,
    //     images: [...event.target.files],
    //     fileName: event.target.value,
    //   };
    // });
    //console.log(formData.images);
  };

  const fileUploadHandler = (event) => {
    console.log("formData", formData);
    event.preventDefault();
    let fData = new FormData();
    fData.append("cake_id", formData.cake_id);
    fData.append("name", formData.name);
    fData.append("description", formData.description);
    fData.append("public", formData.public);
    const tagObj = [...formData.Tags];
    fData.append("tags", JSON.stringify(tagObj));
    for (const file of imagesLoaded.current) {
      fData.append("file", file);
    }
    dispatch(updateCake(fData));
    //todo ver si anda
    imagesLoaded.current = [];
  };

  function handleTest(event) {
    console.log("currentCake T", currentCake);
  }
  return (
    <div>
      <form encType="multipart/form">
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Nombre de la Torta"
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Descripción"
          onChange={handleChange}
        />
        <input
          type="file"
          name="file"
          id="file"
          multiple
          placeholder="Cargar imágenes"
          onChange={fileSelectedHandler}
        />
        <button type="submit" onClick={fileUploadHandler}>
          Guardar Cambios
        </button>
      </form>
      <button type="button" onClick={handleTest}>
        TEST
      </button>
      <div>
        {"LISTA"}
        {/* {currentCake &&
          currentCake.Images.map((image) => {
            return (
              <div>
                <p>IMAGEN URL</p>
                <p>ICONO REMOVE</p>
              </div>
            );
          })} */}
      </div>
    </div>
  );
}

export default ManageCake;
