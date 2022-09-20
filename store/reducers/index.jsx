import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import controlReducer from "./controlReducer";

export default combineReducers({
  logedInData: loginReducer,
  controlData: controlReducer,
});
