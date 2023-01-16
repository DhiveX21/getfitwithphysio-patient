import axios from "axios";
import { setControlSubLoading } from "../store/actions/controlActions";

/////////////////////////////////
//////////////POST///////////////
/////////////////////////////////

export const exerciseVideoSetWatch = (body) => async (dispatch) => {
  try {
    dispatch(setControlSubLoading(true));
    const data = await axios.post(`${urlExerciseService}/video-watches`, {
      ...body,
    });
    dispatch(setControlSubLoading(false));
    return data;
  } catch (error) {
    dispatch(setControlSubLoading(false));
    return Promise.reject(error);
  }
};

/////////////////////////////////
//////////////GET////////////////
/////////////////////////////////

const urlExerciseService = process.env.URL_EXERCISE_SERVICE;
export function exerciseGetAllVideoCategory() {
  return axios.get(`${urlExerciseService}/video-categories`);
}
export function exerciseGetAllVideoByFilter(categoryId = null) {
  return axios.get(`${urlExerciseService}/videos`, {
    params: {
      category_id: categoryId,
    },
  });
}
export function exerciseGetOneVideo(videoId) {
  return axios.get(`${urlExerciseService}/videos/${videoId}`);
}

export function exerciseGetOneVideoByUserId(videoId, userId) {
  return axios.get(`${urlExerciseService}/videos/${videoId}/${userId}`);
}
