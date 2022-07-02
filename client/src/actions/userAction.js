import axios from "axios";

export const registerNewUser = (user) => (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });

  axios
    .post("/users/register", user)
    .then((res) => {
      dispatch({ type: "USER_REGISTER_SUCCESS" });
      window.location.href = "/login";
      console.log(res);
    })
    .catch((err) => {
      dispatch({ type: "USER_REGISTER_FAILED" });
      console.log(err);
    });
};
export const loginUser = (user) => (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });

  axios
    .post("/users/login", user)
    .then((res) => {
      dispatch({ type: "USER_LOGIN_SUCCESS" });

      localStorage.setItem("currentUser", JSON.stringify(res.data));
      localStorage.setItem("token",res.data.token)
      window.location.href = "/";

      if (user.email == "admin@gmail.com") {
        window.location.href = "/admin";
      }
    })
    .catch((err) => {
      dispatch({ type: "USER_LOGIN_FAILED", payload: err });
      console.log(err);
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("cartItems");

  dispatch({ type: "USER_LOGOUT" });

  window.location.href = "/login";
};

export const getAllUsers = () => (dispatch) => {
  dispatch({ type: "GET_ALLUSERS_REQUEST" });

  axios
    .get("/")
    .then((res) => {
      dispatch({ type: "GET_ALLUSERS_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "GET_ALLUSERS_FAILED", payload: err });
    });
};

export const deleteUser = (userid) => (dispatch) => {
  dispatch({ type: "DELETE_USER_REQUEST" });

  axios
    .post("/", { userid })
    .then((res) => {
      dispatch({ type: "DELETE_USER_SUCCESS", payload: res.data });
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: "DELETE_USER_FAILED", payload: err });
    });
};
