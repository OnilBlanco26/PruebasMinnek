import { types } from "../types/types";



const initialState = {
  checking: true,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
      };

    case types.authLogout:
      return {
        checking: false,
      };

    default:
      return state;
  }
};
