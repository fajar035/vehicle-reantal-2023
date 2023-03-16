import axios from "axios";

export const getVehiclesBikeApi = () => {
  const url = `${process.env.REACT_APP_HOSTDEPLOY}/vehicles?filterCategory=bike`;
  return axios.get(url);
};

export const getVehiclesMotorBikeApi = () => {
  const url = `${process.env.REACT_APP_HOSTDEPLOY}/vehicles?filterCategory=motorbike`;
  return axios.get(url);
};

export const getVehiclesCarsApi = () => {
  const url = `${process.env.REACT_APP_HOSTDEPLOY}/vehicles?filterCategory=cars`;
  return axios.get(url);
};

export const getVehiclesPopularApi = () => {
  const url = process.env.REACT_APP_HOSTDEPLOY + "/history/popular";
  return axios.get(url);
};

export const searchVehicleHomeApi = (
  keyword,
  filterLocation,
  filterCategory
) => {
  const url =
    process.env.REACT_APP_HOSTDEPLOY +
    `/vehicles?search=${keyword}&filterLocation=${filterLocation}&filterCategory=${filterCategory}`;
  return axios.get(url);
};

export const updateVehicleApi = (body, token, id) => {
  const url = process.env.REACT_APP_HOSTDEPLOY + "/vehicles/" + id;
  const config = {
    headers: {
      "x-access-token": token,
    },
  };
  return axios.patch(url, body, config);
};

export const getCategoryApi = () => {
  const url = process.env.REACT_APP_HOSTDEPLOY + "/category";
  return axios.get(url);
};

export const newCategory = (body, token) => {
  const url = process.env.REACT_APP_HOSTDEPLOY + "/category";
  const config = {
    headers: {
      "x-access-token": token,
    },
  };
  return axios.post(url, body, config);
};

export const deleteCategoryApi = (id, token) => {
  const url = process.env.REACT_APP_HOSTDEPLOY + "/category/" + id;
  const config = {
    headers: {
      "x-access-token": token,
    },
  };

  return axios.delete(url, config);
};

export const getStatusApi = () => {
  const url = process.env.REACT_APP_HOSTDEPLOY + "/status";
  return axios.get(url);
};

export const getLocationApi = () => {
  const url = process.env.REACT_APP_HOSTDEPLOY + "/location";
  return axios.get(url);
};

export const addVehicleApi = (body, token) => {
  const url = process.env.REACT_APP_HOSTDEPLOY + "/vehicles/";
  console.log(body);
  const config = {
    headers: {
      "x-access-token": token,
    },
  };
  return axios.post(url, body, config);
};

export const getVehicleApi = (id) => {
  const url = process.env.REACT_APP_HOSTDEPLOY + "/vehicles/" + id;
  return axios.get(url);
};

export const getVehiclePopularIdApi = (id) => {
  const url = process.env.REACT_APP_HOSTDEPLOY + "/history/popular/" + id;
  return axios.get(url);
};

export const deleteVehicleApi = (id, token) => {
  const url = process.env.REACT_APP_HOSTDEPLOY + /vehicles/ + id;
  const config = {
    headers: { "x-access-token": token },
  };
  return axios.delete(url, config);
};
