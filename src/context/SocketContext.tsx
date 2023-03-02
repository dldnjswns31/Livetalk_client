import React, { ReactNode, useState, createContext, useContext } from "react";
import { Socket } from "socket.io-client";

export const SocketContext = createContext<null | {
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
}>(null);

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<null | Socket>(null);
  return (
    <SocketContext.Provider value={{ socket, setSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContextProvider;
