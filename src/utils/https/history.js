import axios from "axios";
import { encodeQueryData } from "../helpers/urlParams";

export const getHistoryApi = (params, token) => {
  const URL = `${process.env.REACT_APP_HOSTDEPLOY}/history?sort=${
    params.sort || ""
  }&by=${params.by || ""}&page=${params.page || ""}&limit=${
    params.limit || ""
  }&id_user${params.id || ""}`;
  const url2 = `${process.env.REACT_APP_HOSTDEPLOY}/history?${encodeQueryData(
    params
  )}`;

  return axios.get(url2, { headers: { "x-access-token": token } });
};

export const addHistoryApi = (body, token) => {
  const URL = process.env.REACT_APP_HOSTDEPLOY + "/history";
  return axios.post(URL, body, {
    headers: { "x-access-token": token },
  });
};

export const deleteHistoryApi = (id, token) => {
  const URL = process.env.REACT_APP_HOSTDEPLOY + "/history/" + id;
  return axios.delete(URL, { headers: { "x-access-token": token } });
};

export const updateRatingHistoryApi = (id, body, token) => {
  const url = process.env.REACT_APP_HOSTDEPLOY + "/history/" + id;
  return axios.patch(url, body, {
    headers: { "x-access-token": token },
  });
};
