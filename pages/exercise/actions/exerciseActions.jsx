import { SET_VIDEO_CATEGORY } from "../../../store/types";

const setVideoCategory = (data) => async (dispatch) => {
  dispatch({
    type: SET_VIDEO_CATEGORY,
    payload: data,
  });
};

export default setVideoCategory;
