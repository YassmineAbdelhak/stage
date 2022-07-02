import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions/productAction";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import Success from "../Success/Success";

function AddNewProduct() {
  const [name, setname] = useState("");
  const [price, setprice] = useState();
  const [countinstock, setcountinstock] = useState();
  const [imgurl, setimgurl] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");
  const [unit, setunit] = useState("");
  const [rating, setrating] = useState();

  const dispatch = useDispatch();

  const addnewproductstate = useSelector((state) => state.addProductReducer);
  const { success, loading, error } = addnewproductstate;

  const addproduct = (e) => {
    e.preventDefault();
    const product = {
      name: name,
      price: price,
      unit: unit,
      countInStock: countinstock,
      imgurl: imgurl,
      description: description,
      rating: rating,
      category: category,
    };

    dispatch(addProduct(product));
    
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-8">
          {success && <Success success="Product Added Successfully" />}
          {loading && <Loader />}
          {error && <Error error="Something wrong!" />}
          <h2>Add New Products</h2>
          <form onSubmit={addproduct}>
            <input
              type="text"
              className="form-control mb-2 mr-sm-2"
              placeholder="Name ..."
              required
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <input
              type="number"
              className="form-control mb-2 mr-sm-2"
              placeholder="Price ..."
              required
              value={price}
              onChange={(e) => {
                setprice(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control mb-2 mr-sm-2"
              placeholder="TND"
              required
              value={unit}
              onChange={(e) => {
                setunit(e.target.value);
              }}
            />

            <input
              type="number"
              className="form-control mb-2 mr-sm-2"
              placeholder="Stock ..."
              required
              value={countinstock}
              onChange={(e) => {
                setcountinstock(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control mb-2 mr-sm-2"
              placeholder="Image URL ..."
              required
              value={imgurl}
              onChange={(e) => {
                setimgurl(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control mb-2 mr-sm-2"
              placeholder="Decription ..."
              required
              value={description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />
            <input
              type="number"
              className="form-control mb-2 mr-sm-2"
              placeholder="Rating ..."
              required
              value={rating}
              onChange={(e) => {
                setrating(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control mb-2 mr-sm-2"
              placeholder="Category ..."
              required
              value={category}
              onChange={(e) => {
                setcategory(e.target.value);
              }}
            />

            <button
              className="btn mt-2"
              type="submit"
              style={{
                color: "white",
                backgroundColor: "#343a40",
                width: "200px",
              }}
            >
              Add New Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewProduct;
