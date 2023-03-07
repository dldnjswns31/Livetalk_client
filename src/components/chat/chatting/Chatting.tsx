import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import conversationAPI from "../../../api/conversations";

import { SocketContext } from "../../../context/SocketContext";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { saveCurrentUserList } from "../../../redux/slice/userListSlice";

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

const StMessageContainer = styled.div<{ myself: boolean }>`
  display: inline-flex;
  justify-content: ${({ myself }) => (myself ? "right" : "left")};
  width: 100%;
  padding: 0 1rem;
  margin-bottom: 0.5rem;
`;

const StMessage = styled.span<{ myself: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme, myself }) =>
    myself ? theme.colors.yellow : theme.colors.white};
`;

const Chatting = () => {
  const [messages, setMessages] = useState<
    { from: string; to: string; message: string }[] | null
  >(null);

  const { register, handleSubmit, reset } = useForm<{ message: string }>();
  const socket = useContext(SocketContext);
  const loginUserData = useAppSelector((state) => state.user);
  const selectedUser = useAppSelector((state) => state.selectedUser);
  const currentUserList = useAppSelector((state) => state.userList);

  // 개인메세지 수신했을 때
  useEffect(() => {
    if (socket) {
      socket.on("private message", (data) => {
        console.log("귓속말!", data);
        console.log(currentUserList);
      });
    }
  }, [socket]);

  // 현재 접속한 유저
  useEffect(() => {
    if (socket) {
      socket.emit("userlist");
      socket.on("userlist", (data) => {
        console.log(data);
      });
    }

    return () => {
      socket?.removeListener("userlist");
    };
  }, [selectedUser]);

  useEffect(() => {
    // 해당 유저와의 메세지 내역 http 요청
    // 없다면 그냥 빈 배열을 setState
  }, [selectedUser]);
  return (
    <>
      <StChattingTitle>
        <span>{selectedUser.nickname}</span>
      </StChattingTitle>
      <StChattingContent>
        {currentUserList
          .find((item) => item.uid === selectedUser.uid)
          ?.messages.map((data, idx) => (
            <StMessageContainer
              key={idx}
              myself={data.from === loginUserData.uid}
            >
              <StMessage myself={data.from === loginUserData.uid}>
                {data.message}
              </StMessage>
            </StMessageContainer>
          ))}
      </StChattingContent>
      <StChattingFormContainer>
        <StChattingForm onSubmit={(e) => e.preventDefault()}>
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
