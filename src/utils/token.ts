export const saveToken = (token: string) => {
  return localStorage.setItem("userToken", token);
};

export const getToken = () => {
  return localStorage.getItem("userToken");
};

export const removeToken = () => {
  return localStorage.removeItem("userToken");
};
