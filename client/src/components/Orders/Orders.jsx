import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import { getOrdersByUserId } from "../../actions/orderAction";
import { getAllProducts } from "../../actions/productAction";
import "./Orders.css";
import Navbar from "../Navbar/Navbar";
import Announcement from "../Annoucement/Annoucement";
import Footer from "../Footer/Footer";


function Orders() {
  const orderstate = useSelector((state) => state.getOrdersByUserIdReducer);
  const { orders, error, loading } = orderstate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      dispatch(getOrdersByUserId());
    } else {
      window.location.href = "/login";
    }
  }, []);

  return (<div> 
    <Announcement/>
  <Navbar/>
    <div className="listor">
      <div className="row justify-content-left mt-5">
        <div className="col-md-8">
          <h2 style={{ color: "white" }}>MY ORDERS</h2>
          <br />

          <table className="table table-striped ">
            <thead style={{ backgroundColor: "teal", color: "white" }}>
              <tr>
                <th>Order ID</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Transaction ID</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <Loader />
              ) : error ? (
                <Error error="SOMETHING WENT WRONG!" />
              ) : (
                orders &&
                orders.map((order) => {
                  return (
                    <tr>
                      <td>{order._id}</td>
                      <td>{order.orderAmount} TND</td>
                      <td>{order.createdAt}</td>
                      <td>{order.transactionId}</td>
                      <td>
                        {order.isDelivered ? (
                          <li> Delivered </li>
                        ) : (
                          <li> Order Placed </li>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <footer>
          <Footer />
        </footer>
    </div>
  );
}

export default Orders;
