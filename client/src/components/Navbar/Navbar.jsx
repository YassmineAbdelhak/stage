import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/userAction";
import { filtreProducts } from "../../actions/productAction";
import { useToasts } from "react-toast-notifications";
import "./Navbar.css";

import { useHistory } from "react-router-dom";

function Navbar() {
  {/*const history = useHistory();
  const cartreducer = useSelector((state) => state.cartReducer);
  const { cartItems } = cartreducer;
  const [searchkey, setsearchkey] = useState("");
  const [category, setcategory] = useState("all");

  const { addToast } = useToasts();

  const [categoryList, setCategoryList] = useState([
    "Mobiles",
    "Laptops",
    "Accessories",
    "Fashion",
    "Games",
  ]);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  //console.log(currentUser.user.username)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(filtreProducts(searchkey, category));
  }, [searchkey]);

  const filterByCategoryName = (e) => {
    dispatch(filtreProducts(searchkey, e.target.innerHTML));
  };*/}

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">
          MY SHOP
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/about">
                About us
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/contact">
               Contact
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Categories
              </a>
              <div
                class="dropdown-menu"
                aria-labelledby="navbarDropdown"
                style={{ cursor: "pointer" }}
              >
               
                    <a
                    >
                      <a class="dropdown-item" >
                        {/*category*/}
                      </a>
                    </a>
                
              
              </div>
            </li>
            <li class="nav-item">
              <a className="nav-link" href="/cart">
                {/*Cart : {cartItems.length}{" "}*/}
                <i class="fas fa-shopping-cart" style={{ color: "black" }}></i>
              </a>{" "}
            </li>

            
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {/*currentUser.username.toUpperCase()*/}
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="/orders">
                    Orders
                  </a>
                  <div class="dropdown-divider"></div>
                  <li
                    className="dropdown-item"
                    
                  >
                    Logout
                  </li>
                </div>
              </li>
            
              <li class="nav-item">
                <a class="nav-link" href="/login">
                  Login
                </a>
              </li>
          
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="text"
              placeholder="Search"
            />
            {/* <button
              class="btn btn-outline  my-2 my-sm-0"
              style={{ backgroundColor: "teal", color: "white" }}
              type="submit"
            >
              Search
            </button> */}
          </form>
        </div>
      </nav>
      <hr />
    </div>
  );
}

export default Navbar;
