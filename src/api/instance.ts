import axios, { AxiosInstance } from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const authInstance = (): AxiosInstance => {
  return axios.create({ baseURL: `${BASE_URL}/auth` });
};

export { authInstance };
