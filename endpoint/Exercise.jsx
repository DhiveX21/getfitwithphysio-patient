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

export function exerciseGetOneVideoByUserId(videoId, userId) {
  return axios.get(`${urlExerciseService}/videos/${videoId}/${userId}`);
}

export function exerciseVideoSetWatch(body) {
  return axios.post(`${urlExerciseService}/video-watches`, { ...body });
}
