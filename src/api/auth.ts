import { authInstance } from "./instance";

const authAPI = {
  signup: (data: any) => {
    return authInstance().post("/signup", data);
  },
  signin: (data: any) => {
    return authInstance().post("/signin", data);
  },
};

export default authAPI;
