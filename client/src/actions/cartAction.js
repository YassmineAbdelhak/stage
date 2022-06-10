export const addToCart = (product, quantity) => (dispatch, getState) => {
  const cartItem = {
    name: product.name,
    imgurl: product.imgurl,
    _id: product._id,
    price: product.price,
    unit: product.unit,
    countInStock: product.countInStock,
    quantity: quantity,
  };
  console.log(product);
  dispatch({ type: "ADD_TO_CART", payload: cartItem });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );

  // window.location.href="/cart"
};

export const deleteFromCart = (item) => (dispatch, getState) => {
  dispatch({ type: "DELETE_FROM_CART", payload: item });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
};
