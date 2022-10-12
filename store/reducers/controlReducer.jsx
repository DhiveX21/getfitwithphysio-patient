import { CONTROL_LOADING, CONTROL_NOTIFICATION } from "../types";

const initialState = {
  controlLoading: {
    active: false,
    title: "Loading...",
    description: "Please Wait",
    image: "/images/controlLoading.gif",
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
    case CONTROL_NOTIFICATION:
      return {
        ...state,
        controlNotification: {
          active: false,
          notification: [
            {
              title: "Notification Title",
              message: "Notification Message",
            },
          ],
        },
      };
    default:
      return state;
  }
}
