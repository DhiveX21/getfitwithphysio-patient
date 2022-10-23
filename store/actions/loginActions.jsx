import { LOGIN_DATA, LOGIN_ERROR } from "../types";
import axios from "axios";

export const setLoginData = (data) => async (dispatch) => {
  dispatch({
    type: LOGIN_DATA,
    data: data,
  });
};
