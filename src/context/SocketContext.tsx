import React, { ReactNode, useState, createContext, useContext } from "react";
import { Socket } from "socket.io-client";
import useSocket from "../hooks/useSocket";

export const SocketContext = createContext<null | Socket>(null);

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
  const socket = useSocket("http://localhost:8080");
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketContextProvider;
