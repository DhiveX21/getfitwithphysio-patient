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

export function patientAddSignatureFile(userId, file) {
  let bodyFormData = new FormData();
  bodyFormData.append("signature", file);
  return axios({
    method: "post",
    url: `${urlUserService}/patients/signature/${userId}`,
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  });
}
