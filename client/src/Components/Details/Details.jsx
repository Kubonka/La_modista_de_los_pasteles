import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch(getCake(cake_id));
  }, []);

  if (Object.keys(cake).length > 0)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-pink-200">
        {/* //$ container general */}
        <Header />
        <div className="m-4 flex w-2/3 flex-row items-start justify-center rounded-xl border-2 border-black bg-gray-700">
          {/* //$container de las imagenes */}
          <div className="m-4 flex w-48 flex-col">
            {/* //$container de las 3 chicas */}
            <div className="mb-4 h-[1/3] border-2 border-black">
              <img
                className="object-contain"
                src={cake.Images.filter((image) => image.mainImage)[0].name}
                alt="NOIMAGE"
              />
            </div>
            <div className="mb-4 h-[1/3] border-2 border-black bg-blue-400">
              <img
                className="object-contain"
                src={cake.Images.filter((image) => image.mainImage)[0].name}
                alt="NOIMAGE"
              />
            </div>
            <div className="mb-4 h-[1/3] border-2 border-black bg-blue-400">
              <img
                className="object-contain"
                src={cake.Images.filter((image) => image.mainImage)[0].name}
                alt="NOIMAGE"
              />
            </div>
          </div>
          <div className="mb-4 mt-4 flex flex-col items-center justify-center border-2 border-black bg-gray-700">
            {/* //$ imagen Grande */}
            <div className="flex h-[900px] items-center justify-center bg-white">
              <img
                src={cake.Images.filter((image) => image.mainImage)[0].name}
                alt="NOIMAGE"
                style={{ objectFit: "contain", maxHeight: "100%" }}
              />
            </div>
            <div className="bg-gray-700">
              {/* //$ Description */}
              <p>Descripción :</p>
              <div>{cake.description}</div>
            </div>
          </div>
          <div className="flex w-1/3 flex-row ">
            {/* //$ Panel de Tags */}
            <div className="flex flex-row">
              <TagsPanel tags={cake.Tags} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
}

export default Details;
