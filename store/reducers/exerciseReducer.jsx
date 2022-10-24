import { SET_VIDEO_CATEGORY } from "../types";
const initialState = {
  video: {
    category: null,
    videoList: null,
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_VIDEO_CATEGORY:
      return {
        ...state,
        video: { category: action.payload, videoList: state.videoList },
      };

    default:
      return state;
  }
}
