import axios from "axios";


export const getAllProducts = () => (dispatch) => {
  dispatch({ type: "GET_PRODUCTS_REQUEST" });

  axios
    .get("/products/")
    .then((res) => {
      console.log(res);

      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "GET_PRODUCTS_FAILED", payload: err });
    });
};

export const getProductById = (productid) => (dispatch) => {
  dispatch({ type: "GET_PRODUCTBYID_REQUEST" });

  axios
    .post("/products/", { productid })
    .then((res) => {
      console.log(res);

      dispatch({ type: "GET_PRODUCTBYID_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "GET_PRODUCTBY_FAILED", payload: err });
    });
};

export const filtreProducts = (searchkey, category) => (dispatch) => {
  var filtredproducts;

  dispatch({ type: "GET_PRODUCTS_REQUEST" });
  axios
    .get("//products/")
    .then((res) => {
      filtredproducts = res.data;

      if (searchkey) {
        filtredproducts = res.data.filter((product) => {
          return product.name.toLowerCase().includes(searchkey);
        });
      }

      if (category.toLowerCase() !== "all") {
        filtredproducts = res.data.filter((product) => {
          return product.category
            .toLowerCase()
            .includes(category.toLowerCase());
        });
      }

      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: filtredproducts });
    })
    .catch((err) => {
      dispatch({ type: "GET_PRODUCTS_FAILED" });
    });
};

export const addProductReview = (review, productid) => (dispatch, getState) => {
  dispatch({ type: "ADD_PRODUCT_REVIEW_REQUEST" });
  const currentUser = getState().loginReducer.currentUser;
  axios
    .post("/api/products/addreview", { review, productid, currentUser })
    .then((res) => {
      console.log(res);
      dispatch({ type: "ADD_PRODUCT_REVIEW_SUCCESS" });

      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: "ADD_PRODUCT_REVIEW_FAILED" });
    });
};

export const deleteProduct = (productid) => (dispatch) => {
  dispatch({ type: "DELETE_PRODUCT_REQUEST" });

  axios
    .post("/products/", { productid })
    .then((res) => {
      dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: res.data });
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: "DELETE_PRODUCT_FAILED", payload: err });
    });
};

export const addProduct = (product) => (dispatch) => {
  dispatch({ type: "ADD_PRODUCT_REQUEST" });

  axios
    .post("/products/", { product })
    .then((res) => {
      console.log(res);
      dispatch({ type: "ADD_PRODUCT_SUCCESS" });
      window.location.reload()
    })
    .catch((err) => {
      dispatch({ type: "ADD_PRODUCT_FAILED", payload: err });
    });
};

export const updateProduct = (productid, updatedproduct) => (dispatch) => {
  dispatch({ type: "UPDATE_PRODUCT_REQUEST" });

  axios
    .post("/products/", { productid, updatedproduct })
    .then((res) => {
      console.log(res);
      dispatch({ type: "UPDATE_PRODUCT_SUCCESS" });

      window.location.href = "/admin/productslist";
    })
    .catch((err) => {
      dispatch({ type: "UPDATE_PRODUCT_FAILED" });
    });
};
