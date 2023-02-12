import axios from "axios";
import { setControlSubLoading } from "../store/actions/controlActions";

const urlOrderService = process.env.URL_ORDER_SERVICE;

/////////////////////////////////
//////////////POST///////////////
/////////////////////////////////
export const orderCreate = (body) => async (dispatch) => {
  try {
    dispatch(setControlSubLoading(true));
    const data = await axios.post(`${urlOrderService}/orders/patient`, {
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
//////////////GET////////////////
/////////////////////////////////

export function orderGetAllByUserId(userId) {
  return axios.get(`${urlOrderService}/orders/user/${userId}`);
}
