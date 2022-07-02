import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

function Products({ product }) {
  return (
    <div>
      <div>
        <Link to={`product/${product._id}`}>
         <img
            style={{ height: "250px" }}
            src={product.imgurl}
            className="img-fluid"
         />
          <h1>{product.name}</h1>
         {/*} <ReactStars
            count={product.rating}
            size={28}
            color="#ffd700"
            char={"☆"}
            isHalf={true}
            readonly
          />*/}
          <h1>
            Price: {product.price} {product.unit}
          </h1>
        </Link>
      </div>
    </div>
  );
}

export default Products;
