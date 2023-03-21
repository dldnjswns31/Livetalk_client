import { useAppSelector } from "./index";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (url: string): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (Object.keys(user).length) {
      const newSocket = io(url);
      newSocket.auth = user;

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]);

  return socket;
};

export default useSocket;
