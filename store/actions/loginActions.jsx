import { LOGIN_USER, LOGIN_ERROR } from "../types";
import axios from "axios";
import { useRouter } from "next/router";

export const getUsers = () => async (dispatch) => {
  const router = useRouter();
  try {
    // const res = await axios.get(`http://jsonplaceholder.typicode.com/users`);
    const res = await axios.get(`${router.basePath}/api/login`);
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
