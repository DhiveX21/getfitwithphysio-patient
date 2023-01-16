import axios from "axios";
import { setControlSubLoading } from "../store/actions/controlActions";

const urlUserService = process.env.URL_USER_SERVICE;

/////////////////////////////////
//////////////POST///////////////
/////////////////////////////////
export const userRegister = (body) => async (dispatch) => {
  try {
    dispatch(setControlSubLoading(true));
    const data = await axios.post(`${urlUserService}/users/register`, {
      ...body,
    });
    dispatch(setControlSubLoading(false));
    return data;
  } catch (error) {
    dispatch(setControlSubLoading(false));
    return Promise.reject(error);
  }
};
export const userRegisterCheckOtp = (body) => async (dispatch) => {
  try {
    dispatch(setControlSubLoading(true));
    const data = await axios.post(`${urlUserService}/users/check-otp`, {
      ...body,
    });
    dispatch(setControlSubLoading(false));
    return data;
  } catch (error) {
    dispatch(setControlSubLoading(false));
    return Promise.reject(error);
  }
};
export const userCreatePin = (body) => async (dispatch) => {
  try {
    dispatch(setControlSubLoading(true));
    const data = await axios.post(`${urlUserService}/users/register-pin`, {
      ...body,
    });
    dispatch(setControlSubLoading(false));
    return data;
  } catch (error) {
    dispatch(setControlSubLoading(false));
    return Promise.reject(error);
  }
};
export function userLogin(body) {
  return axios.post(`${urlUserService}/users/login`, { ...body });
}
export const checkUserExist = (body) => async (dispatch) => {
  try {
    dispatch(setControlSubLoading(true));
    const data = await axios.post(`${urlUserService}/users/check-user`, {
      ...body,
    });
    dispatch(setControlSubLoading(false));
    return data;
  } catch (error) {
    dispatch(setControlSubLoading(false));
    return Promise.reject(error);
  }
};
export const patientCreate = (body) => async (dispatch) => {
  try {
    dispatch(setControlSubLoading(true));
    const data = await axios.post(`${urlUserService}/patients`, { ...body });
    dispatch(setControlSubLoading(false));
    return data;
  } catch (error) {
    dispatch(setControlSubLoading(false));
    return Promise.reject(error);
  }
};
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

/////////////////////////////////
///////////////GET///////////////
/////////////////////////////////

export function patientGetOne(patientId) {
  return axios.get(`${urlUserService}/patients/${patientId}`);
}
export function patientGetOneByUserId(userId) {
  return axios.get(`${urlUserService}/patients/user/${userId}`);
}
