import axios from "axios";

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
