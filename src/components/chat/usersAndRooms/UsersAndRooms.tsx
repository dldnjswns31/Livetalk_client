import { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";

import reactIcon from "../../../assets/react.svg";
import { SocketContext } from "../../../context/SocketContext";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { saveCurrentUserList } from "../../../redux/slice/userListSlice";
import User from "./user/User";

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

const UsersAndRooms = () => {
  const [selectedTab, setSelectedTab] = useState<"user" | "chatting">("user");
  //   const [selectedUser, setSelectedUser] = useState<null | {
  //     uid: string;
  //     nickname: string;
  //     messages: any[];
  //   }>(null);

  const loginUserData = useAppSelector((state) => state.user);
  const currentUserList = useAppSelector((state) => state.userList);
  const dispatch = useAppDispatch();
  const socketContext = useContext(SocketContext);

  useEffect(() => {
    const socket = socketContext?.socket;
    if (socket) {
      if (!socket) throw Error("socket 연결이 없습니다.");
      socket.on(
        "users",
        (
          data: {
            uid: string;
            nickname: string;
            messages: any[];
          }[]
        ) => {
          const filterUser = data.filter(
            (user) => user.uid !== loginUserData.uid
          );
          dispatch(
            saveCurrentUserList([
              {
                uid: loginUserData.uid,
                nickname: loginUserData.nickname,
                messages: [],
              },
              ...filterUser,
            ])
          );
        }
      );
    }
  }, [socketContext]);

  // 유저 / 채팅방 탭 클릭했을 시
  const hadnelTabClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const tabName = e.target.dataset.tab;

    if (tabName === "user" || tabName === "chatting") {
      setSelectedTab(tabName);
    }
  };

  return (
    <>
      <StLeftUpperBar>
        <span>현재 접속중인 유저 {currentUserList.length}</span>
      </StLeftUpperBar>
      <StUserListContainer>
        {selectedTab === "user" ? (
          currentUserList &&
          currentUserList.map((userData, index) => {
            return <User key={index} userData={userData} />;
          })
        ) : (
          <span>hi</span>
        )}
      </StUserListContainer>
      <StLeftLowerBar onClick={hadnelTabClick}>
        <StUserOrChatroomButton
          selected={selectedTab === "user"}
          data-tab="user"
        >
          유저
        </StUserOrChatroomButton>
        <StUserOrChatroomButton
          selected={selectedTab === "chatting"}
          data-tab="chatting"
        >
          채팅방
        </StUserOrChatroomButton>
      </StLeftLowerBar>
    </>
  );
};

export default UsersAndRooms;
