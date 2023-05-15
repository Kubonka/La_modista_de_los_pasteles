import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCake } from "../../redux/cakeSlice";
import TagsPanel from "../TagsPanel/TagsPanel";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
//! 1440 px width - 1800 px height
function Details() {
  const { cake_id } = useParams();
  const cake = useSelector((state) => state.cake.currentCake);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState({});

  useEffect(() => {
    dispatch(getCake(cake_id));
  }, []);
  useEffect(() => {
    if (Object.keys(cake).length > 0) setSelectedImage(cake.Images[0]);
  }, [cake]);

  if (Object.keys(cake).length > 0)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-pink-200">
        {/* //$ Container general */}
        <Header />
        {/* //$ Container de todas las imagenes */}
        <div className="m-4 flex w-2/3 flex-row items-start justify-center rounded-xl border-4 border-gray-700 bg-pink-300">
          {/* //$ Preview images */}
          <div className="m-4 flex w-48 flex-col">
            {cake.Images.map((image) => {
              return (
                <div
                  className={
                    selectedImage && selectedImage === image
                      ? "mb-4 h-[1/3] rounded-md border-4 border-pink-500"
                      : "mb-4 h-[1/3] cursor-pointer rounded-md border-4 border-gray-700"
                  }
                  onClick={() => {
                    setSelectedImage(image);
                  }}
                >
                  <img
                    className="rounded-sm object-contain"
                    src={image.name}
                    alt="NOIMAGE"
                  />
                </div>
              );
            })}
          </div>
          <div className="mb-4 mt-4 flex flex-col items-center justify-center ">
            {/* //$ Imagen Grande */}
            <div className="flex h-[900px] w-full items-center justify-center  p-2">
              <img
                src={selectedImage.name}
                alt="NOIMAGE"
                style={{ objectFit: "contain", maxHeight: "100%" }}
              />
            </div>
            <div className="mt-2 rounded-md bg-primary p-2">
              {/* //$ Descripcion */}
              <p className="text-lg font-bold text-white">Descripción :</p>
              <p className=" text-lg font-semibold text-white">
                {cake.description}
              </p>
            </div>
          </div>
          <div className="mt-4 flex w-1/3 flex-col items-center">
            {/* //$ Panel de Tags */}
            <p className=" mb-4 text-2xl font-bold">Etiquetas</p>
            <TagsPanel tags={cake.Tags} />
          </div>
        </div>
        {/* //todo Carrousel de tortas Similares */}
        <Footer />
      </div>
    );
}

export default Details;
