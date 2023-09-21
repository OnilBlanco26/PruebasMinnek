import { types } from "../types/types";

const initialState = {
  dogs: [], 
};

export const dogReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.createDogSuccess:
      return {
        ...state,
        dogs: [...state.dogs, action.payload], 
      };

    case types.deleteDogSuccess:
      return {
        ...state,
        dogs: state.dogs.filter((dog) => dog.id !== action.payload),
      };


    default:
      return state;
  }

};

