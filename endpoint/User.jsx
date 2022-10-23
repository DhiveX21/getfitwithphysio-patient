import axios from "axios";

const urlUserService = process.env.URL_USER_SERVICE;
export function userRegister(body) {
  return axios.post(`${urlUserService}/users/register`, { ...body });
}
export function userRegisterCheckOtp(body) {
  return axios.post(`${urlUserService}/users/check-otp`, { ...body });
}
export function userCreatePin(body) {
  return axios.post(`${urlUserService}/users/register-pin`, { ...body });
}
export function userLogin(body) {
  return axios.post(`${urlUserService}/users/login`, { ...body });
}
export function patientCreate(body) {
  return axios.post(`${urlUserService}/patients`, { ...body });
}
export function patientGetOne(patientId) {
  return axios.get(`${urlUserService}/patients/${patientId}`);
}
export function patientGetOneByUserId(userId) {
  return axios.get(`${urlUserService}/patients/user/${userId}`);
}
