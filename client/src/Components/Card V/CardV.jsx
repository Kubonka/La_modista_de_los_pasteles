import React from 'react'

function CardV({cake}) {
    return (
        <div>
          <div>
            <div>
            </div>
            <Link to={`/detail/${cake_id}`}>
              <img  src={cake.Images} alt={cake_id} />
            </Link>
            <div>{cake.Tags}</div>
          </div>
        </div>
      );
}

export default CardV