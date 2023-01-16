import {
  CONTROL_LOADING,
  FIRST_LOGIN_FORM,
  CONTROL_NOTIFICATION,
  CONTROL_SUB_LOADING,
} from "../types";

import { notificationSetRead } from "../../endpoint/Notification";

export const setControlLoading =
  (cond, title = "", desc = "", image = "/images/controlLoading.webm") =>
  async (dispatch) => {
    dispatch({
      type: CONTROL_LOADING,
      cond: cond,
      title: title,
      desc: desc,
      image: image,
    });
  };

export const setControlSubLoading = (cond) => async (dispatch) => {
  dispatch({
    type: CONTROL_SUB_LOADING,
    cond: cond,
  });
};

export const setControlLoadingWithTimer =
  (timer = 300, title = "", desc = "", image = "/images/controlLoading.webm") =>
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
  (cond, title, message, userId, notificationId) => async (dispatch) => {
    if (userId && notificationId) {
      const body = {
        notification_id: notificationId,
        user_id: userId,
      };
      notificationSetRead(body).then((response) => {});
    }

    dispatch({
      type: CONTROL_NOTIFICATION,
      cond: cond,
      title: title,
      message: message,
    });
  };
