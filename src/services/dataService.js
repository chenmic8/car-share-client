import axios from "axios";
import { baseUrl } from "./baseUrl";

export const get = (route) => {
  return axios.get(baseUrl + route);
};
export const post = (route, body) => {
  return axios.post(baseUrl + route, body);
};
