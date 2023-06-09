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
import { HiEye, HiEyeOff, HiPhotograph, HiTrash, HiX } from "react-icons/hi";
import Select from "react-select";
import swalManager from "../../../scripts/swalManager";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: "2px",
    boxShadow: "none",

    ":focus": {
      backgroundColor: state.isFocused ? "red" : "red",
    },
    ":hover": { borderColor: "black" },
  }),
  option: (provided, state) => ({
    ...provided,
    fontWeight: state.isSelected ? "bold" : "semibold",
    backgroundColor: state.isSelected ? "#7E0040" : "white",
    color: state.isSelected ? "white" : "black",
    cursor: "pointer",
    ":hover": {
      backgroundColor: state.isSelected ? "#7E0040" : "lightgray",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    fontWeight: "semibold",
    color: state.isSelected ? "#7E0040" : "black",
  }),
};

function ManageCake() {
  const { cake_id } = useParams();
  const [lastCake_id, setLastCake_id] = useState("");
  const dispatch = useDispatch();
  const currentCake = useSelector((state) => state.cake.currentCake);
  const currentCakeLoading = useSelector(
    (state) => state.cake.currentCakeLoading
  );
  const allTags = useSelector((state) => state.cake.allTags);
  const [cakeData, setCakeData] = useState({});
  const [imageSelected, setImageSelected] = useState({});
  const filesLoaded = useRef([]);
  const tagsLoaded = useRef([]);

  //! Effects
  useEffect(() => {
    dispatch(getCake(cake_id));
    dispatch(getAllTags());
  }, []);
  useEffect(() => {
    setLastCake_id(cake_id);
    if (lastCake_id !== cake_id) setImageSelected({});
  }, [cake_id]);
  useEffect(() => {
    setCakeData({ ...currentCake });
  }, [currentCake]);
  useEffect(() => {
    tagsLoaded.current = allTags.map((tag) => {
      return { label: tag.name, value: tag.tag_id };
    });
  }, [allTags]);

  //! Handlers
  const handleChange = (event) => {
    setCakeData((p) => {
      return { ...p, [event.target.name]: event.target.value };
    });
  };
  const fileSelectedHandler = (event) => {
    const totalImages = cakeData.Images.reduce((p, image) => {
      if (!image.deleted) return p + 1;
      return p;
    }, 0);
    if (totalImages < 3) {
      for (const key in event.target.files) {
        filesLoaded.current.push(event.target.files[key]);
      }
      filesLoaded.current = filesLoaded.current.slice(0, -2);
      if (totalImages + filesLoaded.current.length <= 3) {
        setCakeData((p) => {
          return {
            ...p,
            Images: [
              ...cakeData.Images,
              ...filesLoaded.current.map((file) => {
                return {
                  image_id: Math.floor(Math.random() * 100 + 10000),
                  name: URL.createObjectURL(file),
                  imageFile: file,
                };
              }),
            ],
          };
        });
      } else {
        swalManager.warning("Maximo de 3 imágenes superado");
        filesLoaded.current = [];
      }
    } else {
      event.preventDefault();
      swalManager.warning("Maximo de 3 imágenes superado");
      return null;
    }
  };
  const fileUploadHandler = (event) => {
    event.preventDefault();
    let fData = new FormData();
    fData.append("cake_id", cakeData.cake_id);
    fData.append("description", cakeData.description);
    fData.append("public", cakeData.public);
    //const tagObj = [...cakeData.Tags]; //!fijarse si quedo bien esto
    fData.append("tags", JSON.stringify(cakeData.Tags));
    const imagesArr = [];
    cakeData.Images.forEach((image) => {
      if (
        filesLoaded.current.length > 0 &&
        image.hasOwnProperty("imageFile") &&
        !image.hasOwnProperty("deleted")
      ) {
        fData.append("file", image.imageFile);
      } else {
        imagesArr.push(image);
      }
    });
    fData.append("images", JSON.stringify(imagesArr));
    filesLoaded.current = [];
    handleUpdateCake(fData);
  };
  async function handleUpdateCake(form) {
    try {
      const result = await dispatch(updateCake(form)).unwrap();
      if (result.status === "SUCCESS") {
        dispatch(getCake(cake_id));
        //imagesLoaded.current = [];
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function onSetMainImage(image_id) {
    //todo buscar el image_id y setear en true esa y las demas en false
    const imagesArr = [];
    let imageSetted = false;
    cakeData.Images.forEach((image) => {
      imagesArr.push({
        ...image,
        mainImage:
          image.image_id === image_id
            ? (() => {
                imageSetted = true;
                return true;
              })()
            : false,
      });
    });
    if (!imageSetted && imagesArr.length > 0) imagesArr[0].mainImage = true;
    setCakeData((p) => {
      return { ...p, Images: imagesArr };
    });
  }
  async function onDeleteImage(image_id) {
    try {
      let isMainImage = false;
      setCakeData((p) => {
        return {
          ...p,
          Images: p.Images.map((image) => {
            const img = { ...image };
            if (img.image_id === image_id) {
              if (img.mainImage) {
                isMainImage = true;
              }
              img.deleted = true;
            }
            return img;
          }),
        };
      });
      if (isMainImage) onSetMainImage(-1); //setea por defecto en caso que se elimine la mainImage
    } catch (error) {
      console.log(error);
    }
  }
  function handleTogglePublic() {
    setCakeData((p) => {
      return { ...p, public: !p.public };
    });
  }
  function handleSelectedTag(option) {
    const tagFound = cakeData.Tags.find((tag) => tag.tag_id === option.value);
    if (!tagFound) {
      setCakeData((p) => {
        return {
          ...p,
          Tags: [...p.Tags, { tag_id: option.value, name: option.label }],
        };
      });
    }
  }
  function handleRemoveTag(selectedTag) {
    console.log(selectedTag);
    setCakeData((p) => {
      return {
        ...p,
        Tags: p.Tags.filter((tag) => tag.tag_id !== selectedTag.tag_id),
      };
    });
  }

  //! MARKUP
  if (currentCakeLoading) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-2xl font-extrabold">LOADING</p>
      </div>
    );
  } else {
    return (
      <div className="flex w-full flex-row gap-8 p-16">
        <div className="w-1/2">
          <form
            encType="multipart/form"
            className="flex w-[100%] flex-col items-center gap-8"
          >
            <div className="flex flex-row gap-4">
              <div className="flex w-56 flex-col  items-center justify-center rounded-md border-2 border-primary bg-primary font-semibold text-white hover:bg-primaryHi ">
                <p className="absolute pl-2 font-semibold ">Cargar Imágenes</p>
                <input
                  type="file"
                  name="file"
                  id="file"
                  multiple
                  placeholder="Cargar imágenes"
                  onChange={fileSelectedHandler}
                  className="w-full cursor-pointer bg-black opacity-0"
                />
              </div>
              <div
                onClick={fileUploadHandler}
                className="flex w-56 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-primary bg-primary  font-semibold text-white hover:bg-primaryHi hover:font-semibold"
              >
                Guardar Cambios
              </div>
            </div>
            <div className="flex h-36 w-full flex-row gap-2">
              <textarea
                rows={4}
                name="description"
                value={cakeData.description}
                id="description"
                placeholder="Descripción de la torta"
                onChange={handleChange}
                className="w-[80%] rounded-md border-2  border-primary bg-white pl-4 font-semibold text-primary"
              />
              <div className="flex w-[20%] flex-col items-center justify-center rounded-md border-2 border-primary bg-white">
                <div className="mb-2 flex h-[30%] w-full items-center justify-center border-b-2 border-primary pb-2 pt-2 ">
                  <div className="font-bold">PUBLICA </div>
                </div>
                <div className="flex h-[60%] flex-col items-center justify-center">
                  {cakeData && cakeData?.public ? (
                    <HiEye
                      className="h-9 w-9 cursor-pointer text-primary hover:text-pink-500"
                      onClick={handleTogglePublic}
                    />
                  ) : (
                    <HiEyeOff
                      className="h-9 w-9 cursor-pointer text-primary hover:text-pink-500"
                      onClick={handleTogglePublic}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="h-auto w-[100%] rounded-md border-2 border-primary bg-white pb-2 pt-2 ">
              <div className="mb-2 flex items-center justify-center  border-b-2 border-primary pb-2">
                <div className="font-bold">TAGS ACTUALES </div>
              </div>
              <div className="flex h-fit flex-row flex-wrap items-center justify-center gap-2">
                {Object.keys(cakeData).length > 0 &&
                  cakeData.Tags.map((tag) => (
                    <div
                      key={tag.tag_id}
                      className="flex h-10 w-[30%] flex-row items-center justify-between rounded-full border-2 border-primary bg-gray-400 pl-2 pr-2"
                    >
                      <p className=" cursor-default font-semibold text-white">
                        {tag.name}
                      </p>
                      <HiX
                        onClick={() => handleRemoveTag(tag)}
                        className="h-6 w-6 cursor-pointer rounded-full bg-primary text-white hover:text-pink-500"
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className="w-[100%]">
              <Select
                options={tagsLoaded.current}
                onChange={(opt) => handleSelectedTag(opt)}
                styles={customStyles}
                placeholder={"Seleccionar Tags"}
              />
            </div>
          </form>
        </div>
        {/* //! SEGUNDO DIV */}
        <div className="flex w-1/2 flex-col items-center gap-4">
          <div className="flex h-2/3 w-[100%] flex-col items-center justify-center rounded-md border-2 border-primary">
            <div className="h-[5%] text-sm"> {imageSelected.name}</div>
            <div className="mb-2 h-[95%] w-[100%]">
              {Object.keys(imageSelected).length > 0 ? (
                <img
                  src={imageSelected.name}
                  alt="VOID"
                  className="h-full w-full object-contain"
                ></img>
              ) : Object.keys(cakeData).length > 0 &&
                cakeData.Images?.length > 0 ? (
                setImageSelected(cakeData.Images[0])
              ) : (
                <div className="text-center font-bold">Vista Previa</div>
              )}
            </div>
          </div>
          {cakeData && cakeData.Images?.length > 0 ? (
            <div className="w-[100%] rounded-md border-2 border-primary p-2">
              <ul>
                {cakeData &&
                  cakeData.Images &&
                  cakeData.Images.map((image) => {
                    if (!image.deleted) {
                      return (
                        <li
                          key={image.image_id}
                          className={
                            image.image_id === imageSelected.image_id
                              ? "flex h-16 max-h-16 flex-row items-center justify-between rounded-md border-2 border-dashed border-primary bg-pink-200 pl-2 pr-2"
                              : "flex h-16 flex-row items-center justify-between rounded-md border-2 border-transparent bg-pink-200 pl-2 pr-2"
                          }
                        >
                          <div
                            onClick={() => {
                              console.log("image -> ", image);
                              setImageSelected(image);
                            }}
                            className={
                              image.image_id === imageSelected.image_id
                                ? "min-w-[80%] cursor-pointer font-semibold text-black"
                                : "min-w-[80%] cursor-pointer font-semibold text-black"
                            }
                          >
                            <p className=" overflow-clip text-ellipsis">
                              {image.name}
                            </p>
                          </div>
                          <div className="flex w-[30%] flex-row items-center justify-center gap-6">
                            <HiPhotograph
                              className={
                                image.mainImage
                                  ? "h-6 w-6 cursor-pointer text-pink-500"
                                  : "h-6 w-6 cursor-pointer text-primary"
                              }
                              onClick={() => onSetMainImage(image.image_id)}
                            />
                            <HiTrash
                              className="h-6 w-6 cursor-pointer text-primary hover:text-pink-500"
                              onClick={() => onDeleteImage(image.image_id)}
                            />
                          </div>
                        </li>
                      );
                    }
                    return null;
                  })}
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}
export default ManageCake;
