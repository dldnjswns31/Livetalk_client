import { useContext, useEffect, useState } from "react";

import conversationAPI from "../../../../api/conversations";
import { SocketContext } from "../../../../context/SocketContext";
import { useAppSelector } from "../../../../hooks";
import St from "./styles";
import { Conversation } from "./";

const ConversationList = () => {
  const [conversations, setConversations] = useState([]);

  const socket = useContext(SocketContext);
  const selectedUser = useAppSelector((state) => state.selectedUser);

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
      socket.on("reload conversation", () => {
        conversationAPI.getAllConverstaions().then((res) => {
          let conversationArr = res.data;
          if (conversationArr.length) {
            setConversations(conversationArr);
          }
        });
      });
      return () => {
        socket.removeListener("reload conversation");
      };
    }
  }, [socket, selectedUser]);

  return (
    <>
      {conversations.length ? (
        conversations.map((conversation, index) => (
          <Conversation key={index} conversation={conversation} />
        ))
      ) : (
        <St.NotifyContainer>
          <span>대화가 없습니다.</span>
        </St.NotifyContainer>
      )}
    </>
  );
};

export default ConversationList;
