import axios from "axios";

const urlAppointmentService = process.env.URL_APPOINTMENT_SERVICE;
export function appointmentGetAll() {
  return axios.get(`${urlAppointmentService}/appointments`);
}
export function appointmentCreate(body) {
  return axios.post(`${urlAppointmentService}/appointments`, { ...body });
}
