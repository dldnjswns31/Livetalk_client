import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
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
  const { register, handleSubmit, reset } = useForm<{ message: string }>();
  const socketContext = useContext(SocketContext);
  const loginUserData = useAppSelector((state) => state.user);
  const selectedUser = useAppSelector((state) => state.selectedUser);
  const currentUserList = useAppSelector((state) => state.userList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = socketContext?.socket;
    if (socket) {
      //   개인메세지 수신했을 때
      socket.on("private message", (data) => {
        console.log("귓속말!", data);
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [socketContext]);

  // 개인메세지 송신
  const onChattingSubmit = (form: { message: string }) => {
    if (!selectedUser) {
      console.error("selectedUser 오류!");
      return;
    }
    const messageObj = {
      from: loginUserData.uid,
      to: selectedUser.uid,
      message: form.message,
    };

    const socket = socketContext?.socket;
    if (socket) {
      let newCurrentUserList = JSON.parse(JSON.stringify(currentUserList));
      newCurrentUserList = newCurrentUserList.map((item) => {
        if (item.uid === messageObj.to) {
          item.messages.push(messageObj);
        }
        return item;
      });
      dispatch(saveCurrentUserList(newCurrentUserList));

      socket.emit("private message", messageObj);
    }
    reset();
  };
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
        <StChattingForm onSubmit={handleSubmit(onChattingSubmit)}>
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
