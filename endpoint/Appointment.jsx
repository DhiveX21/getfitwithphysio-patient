import axios from "axios";
import { setControlSubLoading } from "../store/actions/controlActions";

const urlAppointmentService = process.env.URL_APPOINTMENT_SERVICE;

/////////////////////////////////
//////////////POST///////////////
/////////////////////////////////
export const appointmentCreate = (body) => async (dispatch) => {
  try {
    dispatch(setControlSubLoading(true));
    const data = await axios.post(`${urlAppointmentService}/appointments`, {
      ...body,
    });
    dispatch(setControlSubLoading(false));
    return data;
  } catch (error) {
    dispatch(setControlSubLoading(false));
    return Promise.reject(error);
  }
};

export const appointmentCreateReview = (body) => async (dispatch) => {
  try {
    dispatch(setControlSubLoading(true));
    const data = await axios.post(`${urlAppointmentService}/evaluations`, {
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
///////////////GET///////////////
/////////////////////////////////
export function appointmentGetAll() {
  return axios.get(`${urlAppointmentService}/appointments`);
}
export function appointmentGetOne(appointmentId) {
  return axios.get(`${urlAppointmentService}/appointments/${appointmentId}`);
}
export function appointmentGetAllByUserId(userId) {
  return axios.get(`${urlAppointmentService}/appointments/user/${userId}`);
}
export function appointmentGetAllMedicalRecordByIdUser(userId) {
  return axios.get(`${urlAppointmentService}/records/user/${userId}`);
}
export function appointmentGetOneMedicalRecord(medicalRecordId) {
  return axios.get(`${urlAppointmentService}/records/${medicalRecordId}`);
}
