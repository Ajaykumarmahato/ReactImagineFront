import axios from "axios";
import Swal from "sweetalert2";
import { headers, URL } from "./Constant";

export const axiosPost = (url, params, successCallback, failureCallBack) => {
  if (url == URL.login) {
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
