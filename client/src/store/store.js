import { getAllProductsReducer, getProductByIdReducer, addProductReviewReducer, deleteProductReducer, addProductReducer, updateProductReducer } from "../reducers/productReducer";
import { cartReducer } from "../reducers/cartReducer"
import { registerNewUserReducer, loginReducer, getAllUsersReducer, deleteUserReducer } from "../reducers/userReducer";
import { getOrdersByUserIdReducer, placeOrderReducer, getAllOrdersReducer } from "../reducers/orderReducer"
import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from "redux-logger";

const middleware = [thunk];
const finalReducer = combineReducers({
  getAllProductsReducer: getAllProductsReducer,
  getProductByIdReducer: getProductByIdReducer,
  //cartReducer : cartReducer,
  //registerNewUserReducer : registerNewUserReducer,
  loginReducer : loginReducer,
  //placeOrderReducer : placeOrderReducer,
  //getOrdersByUserIdReducer : getOrdersByUserIdReducer,
  //addProductReviewReducer : addProductReviewReducer,
  //getAllUsersReducer : getAllUsersReducer,
  //deleteUserReducer : deleteUserReducer,
  deleteProductReducer : deleteProductReducer,
  addProductReducer : addProductReducer,
  updateProductReducer : updateProductReducer,
  //getAllOrdersReducer : getAllOrdersReducer
})

//const cartItems = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
//const currentUser = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null


{/*const initialState = {
  cartReducer: {cartItems : cartItems},
  loginReducer : { currentUser : currentUser} 
}*/}

if(process.env.NODE_ENV === "developement"){
  middleware.push(logger);
}

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options
});
const store = createStore(finalReducer,applyMiddleware(...middleware));

export default store;