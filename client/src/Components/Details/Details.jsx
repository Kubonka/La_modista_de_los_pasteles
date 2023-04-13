import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCake } from "../../redux/cakeSlice";
import TagsPanel from "../TagsPanel/TagsPanel";

function Details() {
  const { cake_id } = useParams();
  const cake = useSelector((state) => state.cake.currentCake);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCake(cake_id));
  }, []);

  if (Object.keys(cake).length > 0)
    return (
      <div className="flex flex-col">
        <div className="">
          <img
            className=" h-detailsSize"
            src={`http://localhost:3001/${
              cake.Images.filter((image) => image.mainImage)[0].name
            }`}
            alt="NOIMAGE"
          />
        </div>
        <div>{cake.description}</div>
        <div>
          <TagsPanel tags={cake.Tags} />
        </div>
      </div>
    );
}

export default Details;
