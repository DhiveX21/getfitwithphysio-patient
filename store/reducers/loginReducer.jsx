import { LOGIN_USER,LOGIN_ERROR } from "../types";

const initialState = {
  user: [],
  loading: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case LOGIN_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
