import axios from "axios";
import Swal from "sweetalert2";
import { setIsLoading } from "./ui";
import { types } from "../types/types";


export const createDogAction = (dogData) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));

    axios
      .post(
        "https://pruebasminnek-production.up.railway.app/minnerk/api/v1/dogs", 
        dogData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, 
        }
      )
      .then((resp) => {
        console.log(resp.data);

        dispatch(updateDogsList(resp.data.data.dogs))
        dispatch(createDogSuccess(resp.data));

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


export const createDogSuccess = (dog) => ({
  type: types.createDogSuccess,
  payload: dog,
});

export const updateDogsList = (newDogsList) => ({
  type: types.updateDogList,
  payload: newDogsList,
});