import { useContext, useEffect } from "react";
import styled from "styled-components";
import useSocket from "../../hooks/useSocket";
import withAuth from "../HOC/withAuth";
import { useAppSelector } from "../../hooks";
import { SocketContext } from "../../context/SocketContext";
import UsersAndRooms from "./usersAndRooms/UsersAndRooms";
import Chatting from "./chatting/Chatting";

const StPageContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray_1};
`;

const StChatContainer = styled.div`
  display: inline-flex;
  min-width: 800px;
  min-height: 600px;
  max-height: 700px;
  width: 60vw;
  height: 70vh;
  background-color: ${({ theme }) => theme.colors.white};
`;

const StChatLeftContainer = styled.div`
  display: inline-block;
  width: 50%;
  height: 100%;
`;

// chatting

const StChatRightContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.dark_blue};
`;

const Layout = () => {
  const selectedUser = useAppSelector((state) => state.selectedUser);

  // socket event
  // useEffect(() => {
  //   const socket = socketContext?.socket;
  //   if (socket) {
  //     //   개인메세지 수신했을 때
  //     socket.on("private message", (data) => {
  //       console.log("귓속말!", data);
  //     });
  //     return () => {
  //       socket.disconnect();
  //     };
  //   }
  // }, [socketContext]);

  return (
    <>
      <StPageContainer>
        <StChatContainer>
          <StChatLeftContainer>
            <UsersAndRooms />
          </StChatLeftContainer>
          <StChatRightContainer>
            {Object.keys(selectedUser).length ? (
              <Chatting />
            ) : (
              <span>채팅방을 열어주세요.</span>
            )}
          </StChatRightContainer>
        </StChatContainer>
      </StPageContainer>
    </>
  );
};

export default withAuth(Layout, true);
