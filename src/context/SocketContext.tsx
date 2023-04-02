import { ReactNode, createContext } from "react";
import { Socket } from "socket.io-client";

import useSocket from "../hooks/useSocket";

export const SocketContext = createContext<null | Socket>(null);

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const socket = useSocket(BASE_URL);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketContextProvider;
