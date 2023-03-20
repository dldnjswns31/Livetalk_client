import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import conversationAPI from "../../../api/conversations";
import { SocketContext } from "../../../context/SocketContext";
import { useAppSelector } from "../../../hooks";
import removeDuplicateDate from "../../../utils/removeDuplicateDate";

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

const StMessageContainer = styled.div<{ myself: boolean }>`
  display: inline-flex;
  justify-content: ${({ myself }) => (myself ? "right" : "left")};
  align-items: flex-end;
  width: 100%;
  padding: 0 1rem;
  margin-bottom: 0.5rem;
`;

const StMessage = styled.span<{ myself: boolean }>`
  max-width: 60%;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme, myself }) =>
    myself ? theme.colors.yellow : theme.colors.white};
  word-break: break-all;
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

const StMessageTimeContainer = styled.div`
  display: inline-flex;
  align-items: flex-end;
  height: 100%;
  margin: 0 0.5rem 0 0.5rem;
`;

const StMessageTime = styled.span`
  font-size: 0.6rem;
`;

const Chatting = () => {
  const [messages, setMessages] = useState<
    {
      from: string;
      to: string;
      message: string;
      _id: string;
      createdAt: string;
      isRead: string;
    }[]
  >([]);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset } = useForm<{ message: string }>();
  const socket = useContext(SocketContext);
  const loginUserData = useAppSelector((state) => state.user);
  const selectedUser = useAppSelector((state) => state.selectedUser);

  // 메세지 송/수신했을 때 채팅 내용 갱신
  useEffect(() => {
    if (socket) {
      socket.on("private message", (data) => {
        reloadMessage(selectedUser.uid);
      });
      return () => {
        socket.removeListener("private message");
      };
    }
  }, [socket, selectedUser]);

  // 해당 유저와의 채팅 내역 http 요청
  useEffect(() => {
    reloadMessage(selectedUser.uid);
  }, [selectedUser]);

  useEffect(() => {
    if (chatWindowRef.current)
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [messages]);

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
    conversationAPI.sendMessage(message, selectedUser.uid);
    reset();
  };
  return (
    <>
      <StChattingTitle>
        <span>{selectedUser.nickname}</span>
      </StChattingTitle>
      <StChattingContent ref={chatWindowRef}>
        {messages.length &&
          messages.map((message) => (
            <StMessageContainer
              key={message._id}
              myself={message.from === loginUserData.uid}
            >
              {message.from === loginUserData.uid ? (
                <>
                  <StMessageTimeContainer>
                    <StMessageTime>{message.createdAt}</StMessageTime>
                  </StMessageTimeContainer>
                  <StMessage myself={message.from === loginUserData.uid}>
                    {message.message}
                  </StMessage>
                </>
              ) : (
                <>
                  <StMessage myself={message.from === loginUserData.uid}>
                    {message.message}
                  </StMessage>
                  <StMessageTimeContainer>
                    <StMessageTime>{message.createdAt}</StMessageTime>
                  </StMessageTimeContainer>
                </>
              )}
            </StMessageContainer>
          ))}
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

export default Chatting;
