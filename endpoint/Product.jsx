import axios from "axios";

const urlProductService = process.env.URL_PRODUCT_SERVICE;

export function productGetAll() {
  return axios.get(`${urlProductService}/products`);
}
export function productGetOne(productId) {
  return axios.get(`${urlProductService}/products/${productId}`);
}
