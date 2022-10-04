import { LOGIN_USER, LOGIN_ERROR } from "../types";
import axios from "axios";

export const getUsers = () => async (dispatch) => {
  try {
    // const res = await axios.get(`http://jsonplaceholder.typicode.com/users`);
    const res = await axios.get("http://localhost:3000/api/login");
    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_ERROR,
      payload: error,
    });
  }
};
