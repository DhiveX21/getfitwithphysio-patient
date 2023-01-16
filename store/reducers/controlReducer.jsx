import {
  CONTROL_LOADING,
  CONTROL_NOTIFICATION,
  FIRST_LOGIN_FORM,
  CONTROL_SUB_LOADING,
} from "../types";

const initialState = {
  controlLoading: {
    active: false,
    title: "Loading...",
    description: "Please Wait",
    image: "/images/controlLoading.webm",
  },
  controlSubLoading: {
    active: false,
  },
  controlNotification: {
    active: false,
    notification: [
      {
        title: "Notification Title",
        message: "Notification Message",
      },
    ],
  },
  firstLoginForm: {
    active: false,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CONTROL_LOADING:
      return {
        ...state,
        controlLoading: {
          active: action.cond,
          title: action.title,
          description: action.desc,
          image: action.image,
        },
      };
    case CONTROL_SUB_LOADING:
      return {
        ...state,
        controlSubLoading: {
          active: action.cond,
        },
      };
    case CONTROL_NOTIFICATION:
      return {
        ...state,
        controlNotification: {
          active: action.cond,
          notification: {
            title: action.title,
            message: action.message,
          },
        },
      };
    case FIRST_LOGIN_FORM:
      return {
        ...state,
        firstLoginForm: {
          active: action.cond,
        },
      };
    case CONTROL_NOTIFICATION:
      return {
        ...state,
        notification: {
          active: action.cond,
        },
      };
    default:
      return state;
  }
}
