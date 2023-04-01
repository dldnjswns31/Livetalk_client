import { useState } from "react";

import ConversationList from "./conversationList/ConversationList";
import { UserList } from "./userList";
import St from "./styles";

const Lobby = () => {
  const [selectedTab, setSelectedTab] = useState<"user" | "chatting">("user");

  function hadnelTabClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const tabName = e.target.dataset.tab;

    if (tabName === "user" || tabName === "chatting") {
      setSelectedTab(tabName);
    }
  }

  return (
    <>
      <St.LeftUpperBar>
        <span>{selectedTab === "user" ? "유저 목록" : "채팅"}</span>
      </St.LeftUpperBar>
      <St.Lobby>
        {selectedTab === "user" ? <UserList /> : <ConversationList />}
      </St.Lobby>
      <St.LeftLowerBar onClick={hadnelTabClick}>
        <St.UserOrChatroomButton
          selected={selectedTab === "user"}
          data-tab="user"
        >
          유저
        </St.UserOrChatroomButton>
        <St.UserOrChatroomButton
          selected={selectedTab === "chatting"}
          data-tab="chatting"
        >
          채팅방
        </St.UserOrChatroomButton>
      </St.LeftLowerBar>
    </>
  );
};

export default Lobby;
