export const saveToken = (token: string) => {
  return localStorage.setItem("userToken", token);
};

export const getToken = (token: string) => {
  return localStorage.getItem("userToken");
};
