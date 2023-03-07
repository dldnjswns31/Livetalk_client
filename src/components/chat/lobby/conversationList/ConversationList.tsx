import { useEffect, useState } from "react";
import styled from "styled-components";
import conversationAPI from "../../../../api/conversations";
import Conversation from "./conversation/Conversation";

const StNotifyContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StNotify = styled.span``;

const StConversationContainer = styled.div`
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

const StConversation = styled.div`
  flex: 5 0;
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
`;

const StConversationName = styled.div`
  flex: 1 0;
  display: flex;
  align-items: flex-end;
  margin-bottom: 0.2rem;
`;

const StConversationLastmessage = styled.div`
  flex: 1 0;
  display: flex;
  align-items: flex-start;
  margin-top: 0.2rem;
`;

const StTime = styled.div`
  flex: 1 0;
`;

const ConversationList = () => {
  const [conversations, setConversations] = useState([
    { uid: "123", nickname: "test" },
    { uid: "123", nickname: "test" },
  ]);

  // 렌더링 시 대화 목록 불러오기
  useEffect(() => {
    conversationAPI.getAllConverstaions().then((res) => {
      if (res.data.length) setConversations(res.data);
    });
  }, []);

  return (
    <>
      {conversations.length ? (
        conversations.map((user, index) => (
          <Conversation key={index} user={user} />
        ))
      ) : (
        <StNotifyContainer>
          <StNotify>대화가 없습니다.</StNotify>
        </StNotifyContainer>
      )}
    </>
  );
};

export default ConversationList;
