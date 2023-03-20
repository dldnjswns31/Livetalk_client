import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import conversationAPI from "../../../../api/conversations";
import { SocketContext } from "../../../../context/SocketContext";
import { convertDate } from "../../../../utils/convertDate";
import Conversation from "./conversation/Conversation";

const StNotifyContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const StNotify = styled.span``;

const ConversationList = () => {
  const [conversations, setConversations] = useState([]);

  const socket = useContext(SocketContext);

  // 렌더링 시 대화 목록 불러오기
  useEffect(() => {
    conversationAPI.getAllConverstaions().then((res) => {
      let conversationArr = res.data;
      if (conversationArr.length) {
        setConversations(conversationArr);
      }
    });
  }, []);

  // 대화 도착 시 목록 리렌더링
  useEffect(() => {
    if (socket) {
      socket.on("private message", () => {
        conversationAPI.getAllConverstaions().then((res) => {
          let conversationArr = res.data;
          if (conversationArr.length) {
            setConversations(conversationArr);
          }
        });
      });
    }
  }, [socket]);

  return (
    <>
      {conversations.length ? (
        conversations.map((conversation, index) => (
          <Conversation key={index} conversation={conversation} />
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
