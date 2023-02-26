import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import useSocket from "../../hooks/useSocket";
import reactIcon from "../../assets/react.svg";
import withAuth from "../HOC/withAuth";
import { useAppSelector } from "../../hooks";

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
  width: 60vw;
  height: 70vh;
  background-color: ${({ theme }) => theme.colors.white};
`;

const StChatLeftContainer = styled.div`
  display: inline-block;
  width: 50%;
  height: 100%;
`;

const StLeftUpperBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  background-color: ${({ theme }) => theme.colors.brown};
  color: ${({ theme }) => theme.colors.white};
`;

const StUserListContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  overflow-y: scroll;
`;

const StUser = styled.div`
  display: inline-flex;
  width: 100%;
  height: 4rem;
`;

const StUserImage = styled.div`
  flex: 1 0;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const StUserName = styled.div`
  flex: 5 0;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;

  span {
  }
`;

const StLeftLowerBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
`;

const StUserOrChatroomButton = styled.button<{ selected: boolean }>`
  flex: 1 0;
  height: 100%;
  background: none;
  border: none;
  ${({ selected }) =>
    selected &&
    css`
      border-top: 3px solid ${({ theme }) => theme.colors.brown};
    `}

  color: ${({ theme }) => theme.colors.black};
`;

// chatting

const StChatRightContainer = styled.div`
  display: inline-block;
  width: 50%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.dark_blue};
`;

const Layout = () => {
  const [users, setUsers] = useState<{ uid: string; nickname: string }[]>([]);
  const [myId, setMyId] = useState<null | string>();
  const socket = useSocket("http://localhost:8080");
  const userData = useAppSelector((state) => state.user);

  useEffect(() => {
    if (socket) {
      setMyId(userData.uid);
      socket.on("users", (data: { uid: string; nickname: string }[]) => {
        const filterUser = data.filter((user) => user.uid !== userData.uid);
        setUsers([
          { uid: userData.uid, nickname: userData.nickname },
          ...filterUser,
        ]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [socket]);
  return (
    <>
      <StPageContainer>
        <StChatContainer>
          <StChatLeftContainer>
            <StLeftUpperBar>
              <span>현재 접속중인 유저 {users.length}</span>
            </StLeftUpperBar>
            <StUserListContainer>
              {users &&
                users.map((item, index) => {
                  return (
                    <StUser key={index}>
                      <StUserImage>
                        <img src={reactIcon} alt="userImage" />
                      </StUserImage>
                      <StUserName>
                        <span>{myId === item.uid ? `나` : item.nickname}</span>
                      </StUserName>
                    </StUser>
                  );
                })}
            </StUserListContainer>
            <StLeftLowerBar>
              <StUserOrChatroomButton selected={true} data-tab="user">
                유저
              </StUserOrChatroomButton>
              <StUserOrChatroomButton selected={false} data-tab="chatting">
                채팅방
              </StUserOrChatroomButton>
            </StLeftLowerBar>
          </StChatLeftContainer>
          <StChatRightContainer></StChatRightContainer>
        </StChatContainer>
      </StPageContainer>
    </>
  );
};

export default withAuth(Layout, true);
