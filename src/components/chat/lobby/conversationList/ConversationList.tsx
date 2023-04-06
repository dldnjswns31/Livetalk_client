import { useContext, useEffect, useState } from "react";

import conversationAPI from "../../../../api/conversations";
import { SocketContext } from "../../../../context/SocketContext";
import { useAppSelector } from "../../../../hooks";
import { Conversation } from "./";
import St from "./styles";

interface IConversation {
  _id: string;
  lastMessage: string;
  updatedAt: string;
  unreadCount?: number;
  participantObj: {
    _id: string;
    nickname: string;
  }[];
}

const ConversationList = () => {
  const [conversations, setConversations] = useState<IConversation[]>([]);

  const socket = useContext(SocketContext);
  const selectedUser = useAppSelector((state) => state.selectedUser);

  // 렌더링 시 대화 목록 불러오기
  useEffect(() => {
    conversationAPI
      .getAllConverstaions()
      .then((res: { data: IConversation[] }) => {
        let conversationArr = res.data;
        if (conversationArr.length) {
          setConversations(conversationArr);
        }
      });
  }, []);

  useEffect(() => {
    if (socket) {
      // 대화 도착 시 목록 리렌더링
      socket.on("reload conversation", () => {
        conversationAPI
          .getAllConverstaions()
          .then((res: { data: IConversation[] }) => {
            let conversationArr = res.data;
            if (conversationArr.length) {
              setConversations(conversationArr);
            }
          });
      });

      // 특정 대화방 미확인 카운트 삭제
      socket.on("remove unread", (uid: string) => {
        const removeUnreadCount = conversations.map((item) => {
          if (
            item.participantObj.some((participant) => participant._id === uid)
          )
            item.unreadCount = 0;
          return item;
        });

        setConversations(removeUnreadCount);
      });
      return () => {
        socket.removeListener("reload conversation");
        socket.removeListener("remove unread");
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
