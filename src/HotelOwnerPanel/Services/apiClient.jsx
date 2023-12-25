import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem("AgencyToken");
  const agencyId = localStorage.getItem("AgencyId");

  if (token) {
    config.headers.token = token;
  }
  if (agencyId) {
    config.headers.userId = agencyId;
  }
  return config;
});

class APIClient {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  getRequest = config => {
    return axiosInstance.get(this.endpoint, config).then(res => res.data);
  };

  postRequest = (data, config) => {
    return axiosInstance
      .post(this.endpoint, data, config)
      .then(res => res.data);
  };

  putRequest = (data, config) => {
    return axiosInstance.put(this.endpoint, data, config).then(res => res.data);
  };

  patchRequest = (data, config) => {
    return axiosInstance
      .patch(this.endpoint, data, config)
      .then(res => res.data);
  };

  deleteRequest = config => {
    return axiosInstance.delete(this.endpoint, config).then(res => res.data);
  };
}

export default APIClient;
