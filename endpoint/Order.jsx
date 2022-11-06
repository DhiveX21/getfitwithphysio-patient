import axios from "axios";

const urlOrderService = process.env.URL_ORDER_SERVICE;

export function orderCreate(body) {
  return axios.post(`${urlOrderService}/orders/patient`, { ...body });
}
