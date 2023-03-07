import { useState } from "react";
import styled, { css } from "styled-components";

import ConversationList from "./conversationList/ConversationList";
import UserList from "./userList/UserList";

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
    selected
      ? css`
          border-top: 3px solid ${({ theme }) => theme.colors.brown};
        `
      : css`
          border-top: 3px solid ${({ theme }) => theme.colors.white};
        `}

  color: ${({ theme }) => theme.colors.black};
`;

const Lobby = () => {
  const [selectedTab, setSelectedTab] = useState<"user" | "chatting">("user");

  // 로비 탭 클릭했을 시
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
        <span>현재 접속중인 유저</span>
      </StLeftUpperBar>
      <StUserListContainer>
        {selectedTab === "user" ? <UserList /> : <ConversationList />}
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

export default Lobby;
