import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import useSocket from "../../hooks/useSocket";
import reactIcon from "../../assets/react.svg";
import withAuth from "../HOC/withAuth";
import { useAppSelector } from "../../hooks";
import { useForm } from "react-hook-form";

const StPageContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.gray_1};
`;

const StChatContainer = styled.div`
  display: inline-flex;
  min-width: 800px;
  min-height: 600px;
  max-height: 700px;
  width: 60vw;
  height: 70vh;
  background-color: ${({ theme }) => theme.colors.white};
`;

const StChatLeftContainer = styled.div`
  display: inline-block;
  width: 50%;
  height: 100%;
`;

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

const StUser = styled.div`
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

const StUserName = styled.div`
  flex: 5 0;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
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
    selected &&
    css`
      border-top: 3px solid ${({ theme }) => theme.colors.brown};
    `}

  color: ${({ theme }) => theme.colors.black};
`;

// chatting

const StChatRightContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.dark_blue};
`;

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

const Layout = () => {
  const [users, setUsers] = useState<
    { uid: string; nickname: string; messages: any[] }[]
  >([]);
  const [selectedUser, setSelectedUser] = useState<null | {
    uid: string;
    nickname: string;
    messages: any[];
  }>(null);
  const [myId, setMyId] = useState<null | string>();
  const [selectedTab, setSelectedTab] = useState<"user" | "chatting">("user");

  const { register, handleSubmit, reset } = useForm<{ message: string }>();
  const socket = useSocket("http://localhost:8080");
  const userData = useAppSelector((state) => state.user);

  useEffect(() => {
    if (socket) {
      // setMyId(userData.uid);
      socket.on(
        "users",
        (
          data: {
            uid: string;
            nickname: string;
            messages: any[];
          }[]
        ) => {
          const filterUser = data.filter((user) => user.uid !== userData.uid);
          setUsers([
            {
              uid: userData.uid,
              nickname: userData.nickname,
              messages: [],
            },
            ...filterUser,
          ]);
        }
      );

      // 개인메세지 수신했을 때
      socket.on("private message", (data) => {
        console.log("귓속말!", data);
        setUsers((prev) => {
          return prev.map((item) => {
            if (item.uid === data.from) {
              item.messages.push(data);
              return item;
            }
            return item;
          });
        });
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [socket]);

  const hadnelTabClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLButtonElement)) return;
    const tabName = e.target.dataset.tab;

    if (tabName === "user" || tabName === "chatting") {
      setSelectedTab(tabName);
    }
  };

  const handleUserClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLDivElement)) return;
    if (!e.currentTarget.dataset.user) return;
    const user = JSON.parse(e.currentTarget.dataset.user);
    if (user.uid === userData.uid) return;
    if (user) setSelectedUser(user);
  };

  // 개인메세지 송신
  const onChattingSubmit = (form: { message: string }) => {
    if (!selectedUser) {
      console.error("selectedUser 오류!");
      return;
    }
    const obj = {
      from: userData.uid,
      to: selectedUser.uid,
      message: form.message,
    };

    if (socket) {
      const user = users.find((item) => item.uid === obj.to);
      if (user) user.messages.push(obj);
      socket.emit("private message", obj);
    }
    reset();
  };

  return (
    <>
      <StPageContainer>
        <StChatContainer>
          <StChatLeftContainer>
            <StLeftUpperBar>
              <span>현재 접속중인 유저 {users.length}</span>
            </StLeftUpperBar>
            <StUserListContainer>
              {selectedTab === "user" ? (
                users &&
                users.map((item, index) => {
                  return (
                    <StUser
                      key={index}
                      data-uid={item.uid}
                      data-user={JSON.stringify(item)}
                      onClick={handleUserClick}
                    >
                      <StUserImage>
                        <img src={reactIcon} alt="userImage" />
                      </StUserImage>
                      <StUserName>
                        <span>
                          {userData.uid === item.uid
                            ? `나 (${item.nickname})`
                            : item.nickname}
                        </span>
                      </StUserName>
                    </StUser>
                  );
                })
              ) : (
                <span>hi</span>
              )}
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
          </StChatLeftContainer>
          <StChatRightContainer>
            {selectedUser ? (
              <>
                <StChattingTitle>
                  <span>{selectedUser.nickname}</span>
                </StChattingTitle>
                <StChattingContent>
                  {users
                    .find((item) => item.uid === selectedUser.uid)
                    ?.messages.map((obj, idx) => (
                      <StMessageContainer
                        key={idx}
                        myself={obj.from === userData.uid}
                      >
                        <StMessage myself={obj.from === userData.uid}>
                          {obj.message}
                        </StMessage>
                      </StMessageContainer>
                    ))}
                </StChattingContent>
                <StChattingFormContainer>
                  <StChattingForm onSubmit={handleSubmit(onChattingSubmit)}>
                    <input
                      type="text"
                      {...register("message", { required: true })}
                    />
                    <div>
                      <button>send</button>
                    </div>
                  </StChattingForm>
                </StChattingFormContainer>
              </>
            ) : (
              <span>채팅방을 열어주세요.</span>
            )}
          </StChatRightContainer>
        </StChatContainer>
      </StPageContainer>
    </>
  );
};

export default withAuth(Layout, true);
