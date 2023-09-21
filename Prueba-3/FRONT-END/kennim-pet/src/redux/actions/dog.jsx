import axios from "axios";
import Swal from "sweetalert2";
import { setIsLoading } from "./ui";
import { types } from "../types/types";


export const createDogAction = (dogData) => {
  return (dispatch, getState) => {
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

        dispatch(createDogSuccess(resp.data));
        // const currentDogsList = getState().dogReducer.dogs;
        // const updatedDogsList = [...currentDogsList, resp.data];
        // dispatch(updateDogsList(updatedDogsList));
        

        Swal.fire({
          position: "center",
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