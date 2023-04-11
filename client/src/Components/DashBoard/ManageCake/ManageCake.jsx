import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getCake,
  updateCake,
  deleteImage,
  setMainImage,
  getAllTags,
} from "../../../redux/cakeSlice";
import { HiPhotograph, HiTrash } from "react-icons/hi";
import Select from "react-select";
import axios from "axios";

function ManageCake() {
  const { cake_id } = useParams();
  const dispatch = useDispatch();
  const currentCake = useSelector((state) => state.cake.currentCake);
  const allTags = useSelector((state) => state.cake.allTags);
  const currentCakeLoading = useSelector(
    (state) => state.cake.currentCakeLoading
  );
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [imageSelected, setImageSelected] = useState("");
  const [tags, setTags] = useState([]);
  const imagesLoaded = useRef([]);
  const tagsLoaded = useRef([]);

  useEffect(() => {
    console.log("cake_id", cake_id);
    dispatch(getCake(cake_id));
    dispatch(getAllTags());
  }, []);
  useEffect(() => {
    setFormData({ ...currentCake });
    console.log("2", currentCake);
    setTags((p) => currentCake?.Tags.map((tag) => tag.tag_id));
    console.log("currentCake ue", currentCake);
    imagesLoaded.current = [];
    console.log(currentCakeLoading);
  }, [currentCake]);
  useEffect(() => {
    tagsLoaded.current = allTags.map((tag) => {
      return { label: tag.name, value: tag.tag_id };
    });
  }, [allTags]);

  const handleChange = (event) => {
    setFormData((p) => {
      return { ...p, [event.target.name]: event.target.value };
    });
  };

  const fileSelectedHandler = (event) => {
    imagesLoaded.current = [...event.target.files];
    fileUploadHandler(event);
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
    handleUpdateCake(fData);
  };
  async function handleUpdateCake(form) {
    try {
      const result = await dispatch(updateCake(form)).unwrap();
      if (result.status === "SUCCESS") {
        dispatch(getCake(cake_id));
        imagesLoaded.current = [];
      }
    } catch (error) {
      console.log(error);
    }
  }
  function handleTest(event) {
    console.log("currentCake T", currentCake);
  }

  async function onSetMainImage(image_id) {
    try {
      const result = await dispatch(setMainImage(image_id, cake_id)).unwrap();
      if (result.status === "SUCCESS") {
        dispatch(getCake(cake_id));
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function onDeleteImage(image_id) {
    try {
      const result = await dispatch(deleteImage(image_id));
      if (result.status === "SUCCESS") {
        dispatch(getCake(cake_id));
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleSelectedTag(option) {
    //TODO ARREGLAR
    console.log(option);
    console.log(tags);
    const foundTag = tags.find((tag) => tag === option.value);
    if (!foundTag) {
      setTags((p) => [...p, option.value]);
    }
  }

  return (
    <div>
      <form encType="multipart/form">
        <input
          type="text"
          value={formData.name}
          name="name"
          id="name"
          placeholder="Nombre de la Torta"
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={formData.description}
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
      <img src={`http://localhost:3001/${imageSelected}`} alt="NADA"></img>
      <div>
        <ul>
          {currentCake &&
            currentCake.Images &&
            currentCake.Images.map((image) => {
              return (
                <li key={image.image_id}>
                  <div
                    onClick={() => {
                      setImageSelected(image.name);
                    }}
                  >
                    {image.name}
                  </div>
                  <div onClick={() => onSetMainImage(image.image_id)}>
                    <HiPhotograph />
                  </div>
                  <div onClick={() => onDeleteImage(image.image_id)}>
                    <HiTrash />
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      <div>
        <Select
          options={tagsLoaded.current}
          isMulti
          onChange={(opt) => handleSelectedTag(opt)}
        />
      </div>
      <div>
        {"TODO"}
        {tags && tags.map((tag) => <p>{tag}</p>)}
      </div>
    </div>
  );
}

export default ManageCake;
