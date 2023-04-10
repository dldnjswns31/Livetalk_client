import { memo } from "react";
import { useAppSelector } from "../../../hooks";
import St from "./styles";

interface IProps {
  message: {
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
  };
  firstMessageRef: React.RefObject<HTMLDivElement> | null;
}

const Message = ({ message, firstMessageRef }: IProps) => {
  const loginUserData = useAppSelector((state) => state.user);
  return (
    <div ref={firstMessageRef}>
      {message.showedDate && (
        <St.DateDivideContainer>
          <St.DateDivide>{message.showedDate}</St.DateDivide>
        </St.DateDivideContainer>
      )}
      <St.MessageContainer myself={message.from === loginUserData.uid}>
        {message.from === loginUserData.uid ? (
          <>
            <St.MessageTimeUnreadContainer
              myself={message.from === loginUserData.uid}
            >
              {message.isRead ? null : <St.Unread>1</St.Unread>}
              <St.MessageTime>{message.showedTime}</St.MessageTime>
            </St.MessageTimeUnreadContainer>
            <St.Message myself={message.from === loginUserData.uid}>
              {message.message}
            </St.Message>
          </>
        ) : (
          <>
            <St.Message myself={message.from === loginUserData.uid}>
              {message.message}
            </St.Message>
            <St.MessageTimeUnreadContainer
              myself={message.from === loginUserData.uid}
            >
              {message.isRead ? null : <St.Unread>1</St.Unread>}
              <St.MessageTime>{message.showedTime}</St.MessageTime>
            </St.MessageTimeUnreadContainer>
          </>
        )}
      </St.MessageContainer>
    </div>
  );
};

export default memo(Message);
