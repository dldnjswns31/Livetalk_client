import { AxiosInstance } from "axios";
import { getToken } from "../utils/token";

export function setInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(
    function (config) {
      const token = getToken();
      config.headers.authorization = token;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return instance;
}
