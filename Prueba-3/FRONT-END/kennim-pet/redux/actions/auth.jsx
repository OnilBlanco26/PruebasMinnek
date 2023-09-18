import axios from "axios";
import Swal from "sweetalert2";
import { setIsLoading } from "./ui";
import { types } from "./types/types";
import getConfig from "../../helpers/getConfig";

export const startLogin = (email, password) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .post(
        "localhost:3000/minnerk/api/v1/auth/login",
        {
          email,
          password,
        }
      )
      .then((resp) => {
        localStorage.setItem("token", resp.data.token);
        dispatch(
          login({
            id: resp.data.user.uid,
            name: resp.data.user.name,
          })
        );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: resp.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response?.data?.message,
        });
      })
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const startRegister = (email, password) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .post(
        "localhost:3000/minnerk/api/v1/auth/signup",
        { email, password }
      )
      .then((resp) => {
        localStorage.setItem("token", resp.data.token);
        dispatch(
          login({
            id: resp.data.user.uid,
            email: resp.data.user.email,
          })
        );
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: resp.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      })
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const startChecking = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .get(
        "localhost:3000/minnerk/api/v1/users/renew",
        getConfig()
      )
      .then((resp) => {
        console.log("LEEME! 🙌", resp);
        localStorage.setItem("token", resp.data.token);
        dispatch(
          login({
            id: resp.data.user.uid,
            email: resp.data.user.email,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => dispatch(setIsLoading(false)));
  };
};

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const logout = () => ({
  type: types.authLogout,
});
