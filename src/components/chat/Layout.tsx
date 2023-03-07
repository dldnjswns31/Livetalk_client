import styled from "styled-components";

import withAuth from "../HOC/withAuth";
import { useAppSelector } from "../../hooks";
import Lobby from "./lobby/Lobby";
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

  return (
    <>
      <StPageContainer>
        <StChatContainer>
          <StChatLeftContainer>
            <Lobby />
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
