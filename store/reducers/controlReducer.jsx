import { CONTROL_LOADING } from "../types";

const initialState = {
  controlLoading: {
    active: false,
    title: "Loading...",
    description: "Please Wait",
    image: "/images/controlLoading.gif",
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
    default:
      return state;
  }
}
