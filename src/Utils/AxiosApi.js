import axios from "axios";
import Swal from "sweetalert2";
import { headers, URL } from "./Constant";

export const axiosPost = (url, params, successCallback, failureCallBack) => {
  if (url == URL.login||url==URL.registerUser) {
    axios
      .post(url, params)
      .then(successCallback || function (response) {})
      .catch(failureCallBack || function (response) {});
  } else {
    axios
      .post(url, params, { headers })
      .then(successCallback || function (response) {})
      .catch(failureCallBack || function (response) {});
  }
};

export const axiosGet = (url, successCallback, failureCallBack) => {
  axios
    .get(url, { headers })
     .then(successCallback || function (response) {})
      .catch(failureCallBack || function (response) {});
};
