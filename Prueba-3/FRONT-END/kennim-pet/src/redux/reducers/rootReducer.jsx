import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { uiReducer } from "./uiReducer";
import { dogReducer } from "./dogReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  dog: dogReducer,
});
