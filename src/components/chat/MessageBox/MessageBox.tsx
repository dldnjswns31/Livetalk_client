import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import conversationAPI from "../../../api/conversations";
import { SocketContext } from "../../../context/SocketContext";
import { useAppSelector } from "../../../hooks";
import removeDuplicateDate from "../../../utils/removeDuplicateDate";
import Message from "./message/Message";

const StChattingTitle = styled.div`
  display: inline-flex;
  justify-content: start;
  align-items: center;
  flex: 1 0;
  width: 100%;
  padding: 0 2rem;

  span {
    width: 100%;
  }
`;

const StChattingContent = styled.div`
  width: 100%;
  padding: 1rem;
  flex: 8 0;
  overflow-y: scroll;
`;

const StChattingFormContainer = styled.div`
  display: block;
  width: 100%;
  flex: 1 0;
`;

const StChattingForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.colors.white};

  input {
    flex: 10 0;
    height: 60%;
    margin-right: 1rem;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 0;
    height: 60%;
    margin-left: 1rem;

    button {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: none;
    }
  }
`;

const MessageBox = () => {
  const [messages, setMessages] = useState<
    {
      from: string;
      to: string;
      message: string;
      _id: string;
      createdAt: string;
      isRead: string;
      formattedDate: string;
      formattedTime: string;
      showedTime: string;
      showedDate: string;
    }[]
  >([]);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset } = useForm<{ message: string }>();
  const socket = useContext(SocketContext);
  const selectedUser = useAppSelector((state) => state.selectedUser);

  // 해당 conversationId room 참가
  useEffect(() => {
    if (socket) {
      socket.emit("join room", selectedUser);
    }

    return () => {
      if (socket) {
        socket.emit("leave room", selectedUser);
      }
    };
  }, [socket, selectedUser]);

  // 메세지 송/수신했을 때 채팅 내용 갱신
  useEffect(() => {
    if (socket) {
      socket.on("private message", (message) => {
        const newMessageArr = removeDuplicateDate([...messages, message]);
        setMessages(newMessageArr);
      });
      return () => {
        socket.removeListener("private message");
      };
    }
  }, [socket, selectedUser, messages]);

  // 해당 유저와의 채팅 내역 http 요청
  useEffect(() => {
    reloadMessage(selectedUser.uid);
  }, [selectedUser]);

  // 메세지 수신 시 스크롤 아래로 이동
  useLayoutEffect(() => {
    scrollToBottom(chatWindowRef);
  }, [messages]);

  const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) ref.current.scrollIntoView();
  };

  const reloadMessage = (uid: string) => {
    conversationAPI.getConversation(uid).then((res) => {
      if (res.data.length) {
        const messages = removeDuplicateDate(res.data);
        setMessages(messages);
      } else {
        setMessages([]);
      }
    });
  };

  const onSubmit = (data: { message: string }) => {
    const { message } = data;
    socket?.emit("message", { message, to: selectedUser.uid });
    reset();
  };

  return (
    <>
      <StChattingTitle>
        <span>{selectedUser.nickname}</span>
      </StChattingTitle>
      <StChattingContent>
        {messages.length !== 0 &&
          messages.map((message) => (
            <Message key={message._id} message={message} />
          ))}
        <div ref={chatWindowRef} />
      </StChattingContent>
      <StChattingFormContainer>
        <StChattingForm onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register("message", { required: true })} />
          <div>
            <button>send</button>
          </div>
        </StChattingForm>
      </StChattingFormContainer>
    </>
  );
};

export default MessageBox;
