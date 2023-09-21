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

      case types.updateDogList:
        return {
          ...state,
          dogs: action.payload,
        };


    default:
      return state;
  }

};

