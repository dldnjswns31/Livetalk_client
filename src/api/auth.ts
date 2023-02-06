import { authInstance } from "./instance";

const auth = authInstance();

const authAPI = {
  signup: (data: any) => {
    return auth.post("/signup", data);
  },
  signin: (data: any) => {
    return auth.post("/signin", data);
  },
};

export default authAPI;
