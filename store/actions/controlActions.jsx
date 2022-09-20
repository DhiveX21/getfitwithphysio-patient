import { CONTROL_LOADING } from "../types";

export const setControlLoading =
  (cond, title = "", desc = "", image = "/images/controlLoading.gif") =>
  async (dispatch) => {
    dispatch({
      type: CONTROL_LOADING,
      cond: cond,
      title: title,
      desc: desc,
      image: image,
    });
  };
