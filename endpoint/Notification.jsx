import axios from "axios";

/////////////////////////////////
//////////////POST///////////////
/////////////////////////////////
const urlNotificationUrl = process.env.URL_NOTIFICATION_SERVICE;
export function notificationGetAllByUserId(userId, body) {
  return axios.post(`${urlNotificationUrl}/notifications/${userId}`, {
    ...body,
  });
}

export function notificationSetRead(body) {
  return axios.post(`${urlNotificationUrl}/notification-reads`, {
    ...body,
  });
}

/////////////////////////////////
//////////////GET///////////////
/////////////////////////////////
export function notificationGetById(notificationId) {
  return axios.get(`${urlNotificationUrl}/notifications/${notificationId}`);
}
