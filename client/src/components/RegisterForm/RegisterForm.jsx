import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerNewUser } from "../../actions/userAction";
import Error from "../Error/Error";
import Loader from "../Loader/Loader";
import Success from "../Success/Success";
import "./RegisterForm.css";

function RegisterForm() {
  const registerstate = useSelector((state) => state.registerNewUserReducer);
  const { loading, error, success } = registerstate;
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");

  const dispatch = useDispatch();

  const register = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      email: email,
      password: password,
    };
    if (password == cpassword) {
      dispatch(registerNewUser(user));
    } else {
      alert("Please confirm your Password!");
    }
  };

  return (
    <div className="frm">
      <div className="row justify-content-center">
        <div className="zoomoutcard col-md-5 card p-5 shadow p-3 mb-5 bg-white rounded">
          <div className="div">
            <h4 className="text-center" style={{ color: "#253C59" }}>
              REGISTER
            </h4>
            {loading && <Loader />}
            {error && <Error error="Email Already Exist!" />}
            {success && <Success success="You are successfully Registred!" />}

            <form onSubmit={register}>
              <input
                type="text"
                placeholder="Username..."
                className="form-control mb-20"
                required
                value={username}
                onChange={(e) => {
                  setusername(e.target.value);
                }}
              />
              <input
                type="email"
                placeholder="Email..."
                className="form-control mb-20"
                required
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Password..."
                className="form-control mb-20"
                required
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Confirm Password..."
                className="form-control"
                required
                value={cpassword}
                onChange={(e) => {
                  setcpassword(e.target.value);
                }}
              />
              <div className="bt mt-2">
                <button
                  type="submit"
                  className="btn"
                  style={{ color: "white", backgroundColor: "#BF382C", width:"200px"}}
                >
                  REGISTER NOW
                </button>
              </div>
            </form>
            <br />
            <a href="/login" style={{ color: "#253C59" }}>
              <h5>Already Registred? Click here to Login!</h5>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
