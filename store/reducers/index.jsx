import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import controlReducer from "./controlReducer";
import exerciseReducer from "./exerciseReducer";
import { HYDRATE, createWrapper } from "next-redux-wrapper";

const combinedReducer = combineReducers({
  logedInData: loginReducer,
  controlData: controlReducer,
  exerciseData: exerciseReducer,
});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      logedInData: { ...action.payload.logedInData, ...state.logedInData },
      controlData: { ...action.payload.controlData, ...state.controlData },
      exerciseData: { ...action.payload.exerciseData, ...state.exerciseData },
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export default masterReducer;
