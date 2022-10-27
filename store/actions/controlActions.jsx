import {
  CONTROL_LOADING,
  FIRST_LOGIN_FORM,
  CONTROL_NOTIFICATION,
} from "../types";

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

export const setControlLoadingWithTimer =
  (timer = 300, title = "", desc = "", image = "/images/controlLoading.gif") =>
  async (dispatch) => {
    dispatch({
      type: CONTROL_LOADING,
      cond: true,
      title: title,
      desc: desc,
      image: image,
    });
    setTimeout(() => {
      dispatch({
        type: CONTROL_LOADING,
        cond: false,
        title: title,
        desc: desc,
        image: image,
      });
    }, timer);
  };

export const setFirstLoginForm = (cond) => async (dispatch) => {
  dispatch({
    type: FIRST_LOGIN_FORM,
    cond: cond,
  });
};

export const setControlNotification =
  (cond, title, message) => async (dispatch) => {
    dispatch({
      type: CONTROL_NOTIFICATION,
      cond: cond,
      title: title,
      message: message,
    });
  };
