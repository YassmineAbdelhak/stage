import React, { Component }  from 'react';
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";

import ProductsDescription from "./components/ProductsDescription/ProductsDescription";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import LoginForm from "./components/LoginForm/LoginForm";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Orders from "./components/Orders/Orders";
import Footer from "./components/Footer/Footer";
import Admin from "./components/Admin/Admin";
import Error from "./components/Error/Error";
import Annoucement from "./components/Annoucement/Annoucement";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import About from "./components/About/About";

import ProductCategoryList from "./components/ProductCategoryList/ProductCategoryList";

import { Link } from "react-router-dom";
import Contact from "./components/Contact/Contact";

function App() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <ToastProvider
      placement="top-center"
      autoDismiss="true"
      autoDismissTimeout={4000}
    >
      <div className="App">
        {/* <Category/> */}

        <Annoucement/>
        <Navbar/> 

        <BrowserRouter>
        <Route path="/" component={Home} exact />
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          
          {/*<Route path="/product/:id" component={ProductsDescription} />
          <Route path="/cart" component={Cart} />
          
          <Route path="/orders" component={Orders} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route
            exact
            path="/product-list/:category"
            render={() => <ProductCategoryList />}
  />*/}
          <Route>
            {user ? (
              user.isAdmin ? (
                <Route path="/admin" component={Admin} />
              ) : window.location.pathname === "/admin" ? (
                <div>
                  <Error error={"Permission Denied!"} />
                </div>
              ) : null
            ) : null}
              </Route>
          {/* <Route path="/test" component={Category} /> */}
        </BrowserRouter>
      </div>
    </ToastProvider>
  );
}

export default App;
