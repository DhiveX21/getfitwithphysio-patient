import axios from "axios";
import { setControlSubLoading } from "../store/actions/controlActions";

const urlTransactionService = process.env.URL_TRANSACTION_SERVICE;

/////////////////////////////////
//////////////POST///////////////
/////////////////////////////////

/////////////////////////////////
///////////////GET///////////////
/////////////////////////////////
export function paymentMethodGetAll() {
  return axios.get(`${urlTransactionService}/payments/method`);
}
