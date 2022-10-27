import axios from "axios";

const urlNotificationUrl = process.env.URL_NOTIFICATION_SERVICE;
export function notificationGetAllByUserId(userId, body) {
  return axios.post(`${urlNotificationUrl}/notifications/${userId}`, {
    ...body,
  });
}

export function notificationGetById(notificationId) {
  return axios.get(`${urlNotificationUrl}/notifications/${notificationId}`);
}
