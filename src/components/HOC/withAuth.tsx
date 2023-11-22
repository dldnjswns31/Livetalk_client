import { ComponentType, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/token";

export const withAuth =
  (Component: ComponentType, auth: boolean) =>
  <P extends object>(props: P) => {
    const [isAuthentication, setIsAuthentication] = useState<boolean | null>(
      null
    );

    const navigate = useNavigate();

    useEffect(() => {
      const token = getToken();
      if (auth && !token) {
        navigate("/login");
      }

      // 인증 필요 없는 route && 토큰 존재 시 채팅방으로 자동 이동
      if (!auth && token) {
        navigate("/");
      }

      setIsAuthentication(token !== null);
    }, [navigate]);

    return isAuthentication === null ? null : <Component {...props} />;
  };

export default withAuth;
