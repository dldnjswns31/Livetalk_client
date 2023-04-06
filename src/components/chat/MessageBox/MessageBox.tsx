import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";

import conversationAPI from "../../../api/conversations";
import { SocketContext } from "../../../context/SocketContext";
import { useAppSelector } from "../../../hooks";
import removeDuplicateDate from "../../../utils/removeDuplicateDate";
import { Message } from "./";
import St from "./styles";

interface IMessage {
  from: string;
  to: string;
  message: string;
  _id: string;
  createdAt: string;
  isRead: boolean;
  formattedDate: string;
  formattedTime: string;
  showedTime: string;
  showedDate: string;
}

const MessageBox = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isScroll, setIsScroll] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const firstMessageRef = useRef<HTMLDivElement | null>(null);
  const messageLengthRef = useRef(0);

  const { register, handleSubmit, reset } = useForm<{ message: string }>();
  const socket = useContext(SocketContext);
  const selectedUser = useAppSelector((state) => state.selectedUser);

  // 해당 conversationId room 참가
  // 상대방이 메세지를 읽을 경우 (채팅방에 참가했을 때) 클라이언트가 보낸 모든 메세지의 안읽음 표시 삭제
  useEffect(() => {
    if (socket) {
      socket.emit("join room", selectedUser.uid);
      socket.on("read message", () => {
        setMessages((prev) =>
          prev.map((message) => {
            message.isRead = true;
            return message;
          })
        );
      });
    }

    return () => {
      if (socket) {
        socket.emit("leave room", selectedUser.uid);
        socket.removeListener("read message");
      }
    };
  }, [socket, selectedUser]);

  // 메세지 송/수신했을 때 채팅 내용 갱신
  useEffect(() => {
    if (socket) {
      socket.on("private message", (message) => {
        const newMessageArr = removeDuplicateDate([...messages, message]);

        setMessages(newMessageArr);
        setIsScroll(true);
      });
      return () => {
        socket.removeListener("private message");
      };
    }
  }, [socket, selectedUser, messages]);

  // 해당 유저와의 채팅 내역 http 요청
  // 해당 유저와의 채팅 읽음 표시
  useLayoutEffect(() => {
    // 스크롤을 내리기 위해 빈 값으로 상태갱신
    // 안해주면 이전 메세지 값과 섞여서 유저 변경 시 스크롤이 이상한 곳으로 가있음
    setMessages([]);
    loadMessage(selectedUser.uid);
    if (socket) {
      socket.emit("read message", selectedUser.uid);
    }
  }, [selectedUser, socket]);

  // 메세지 수신 시 스크롤 아래로 이동
  useLayoutEffect(() => {
    if (messageLengthRef.current === 0) {
      scrollToBottom(chatWindowRef);
    }
    messageLengthRef.current = messages.length;
  }, [messages]);

  useLayoutEffect(() => {
    if (isScroll) {
      scrollToBottom(chatWindowRef);
      setIsScroll((prev) => !prev);
    }
  }, [isScroll]);

  // 스크롤 페이징
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        conversationAPI
          .getMoreMessage(selectedUser.uid, messages[0]._id)
          .then((res) => {
            if (res.data.length) {
              const prevMessages = removeDuplicateDate([
                ...res.data,
                ...messages,
              ]);
              setMessages(prevMessages);
            } else {
              observer.disconnect();
            }
          });
      }
    });
    observerRef.current = observer;
    if (firstMessageRef.current) {
      observer.observe(firstMessageRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [messages]);

  function scrollToBottom(ref: React.RefObject<HTMLDivElement>) {
    if (ref.current) ref.current.scrollIntoView();
  }

  function loadMessage(uid: string) {
    conversationAPI.getConversation(uid).then((res) => {
      if (res.data.length) {
        const messages = removeDuplicateDate(res.data);
        setMessages(messages);
      } else {
        setMessages([]);
      }
    });
  }

  function onSubmit(data: { message: string }) {
    const { message } = data;
    socket?.emit("message", { message, to: selectedUser.uid });
    reset();
  }

  return (
    <>
      <St.ChattingTitle>
        <span>{selectedUser.nickname}</span>
      </St.ChattingTitle>
      <St.ChattingContent>
        {messages.length !== 0 &&
          messages.map((message, index) => (
            <Message
              key={message._id}
              message={message}
              firstMessageRef={index === 0 ? firstMessageRef : null}
            />
          ))}
        <div ref={chatWindowRef} />
      </St.ChattingContent>
      <St.ChattingFormContainer>
        <St.ChattingForm onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register("message", { required: true })} />
          <div>
            <button>send</button>
          </div>
        </St.ChattingForm>
      </St.ChattingFormContainer>
    </>
  );
};

export default MessageBox;
