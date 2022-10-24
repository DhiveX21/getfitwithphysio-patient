import axios from "axios";

const urlAppointmentService = process.env.URL_APPOINTMENT_SERVICE;
export function appointmentGetAll() {
  return axios.get(`${urlAppointmentService}/appointments`);
}
export function appointmentCreate(body) {
  return axios.post(`${urlAppointmentService}/appointments`, { ...body });
}
export function appointmentGetOne(appointmentId) {
  return axios.get(`${urlAppointmentService}/appointments/${appointmentId}`);
}
export function appointmentGetAllByUserId(userId) {
  return axios.get(`${urlAppointmentService}//appointments/user/${userId}`);
}
export function appointmentCreateReview(body) {
  return axios.post(`${urlAppointmentService}/evaluations`, { ...body });
}
