import { ComponentType, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/token";

export const withAuth =
  (Component: ComponentType, auth: boolean) =>
  <P extends object>(props: P) => {
    const navigate = useNavigate();
    useEffect(() => {
      const token = getToken();
      if (auth) {
        if (!token) {
          navigate("/login");
        }
      } else {
        if (token) {
          navigate("/");
        }
      }
    }, []);
    return <Component {...props} />;
  };

export default withAuth;
