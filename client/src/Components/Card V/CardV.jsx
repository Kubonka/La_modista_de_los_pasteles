import React from "react";
import { Link } from "react-router-dom";
import TagsPanel from "../TagsPanel/TagsPanel";
function CardV({ cake }) {
  console.log("cake,", cake);
  if (Object.keys(cake).length > 0)
    return (
      <div>
        <div>
          <div></div>
          <Link to={`/detail/${cake.cake_id}`}>
            <img
              src={`http://localhost:3001/${
                cake.Images.filter((image) => image.mainImage)[0].name
              }`}
              alt={cake.cake_id}
            />
          </Link>
          <div>
            <TagsPanel tags={cake.Tags} />
          </div>
        </div>
      </div>
    );
}

export default CardV;
