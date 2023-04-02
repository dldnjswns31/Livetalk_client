import axios, { AxiosInstance } from "axios";
import { setInterceptors } from "./interceptors";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const authInstance = (): AxiosInstance => {
  const instance = axios.create({ baseURL: `${BASE_URL}/auth` });
  return setInterceptors(instance);
};

const conversationInstance = (): AxiosInstance => {
  const instance = axios.create({ baseURL: `${BASE_URL}/chat` });
  return setInterceptors(instance);
};

export { authInstance, conversationInstance };
