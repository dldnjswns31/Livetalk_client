import { useAppSelector } from "../../../hooks";
import St from "./styles";

interface IProps {
  message: {
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
            <St.MessageTimeContainer>
              <St.MessageTime>{message.showedTime}</St.MessageTime>
            </St.MessageTimeContainer>
            <St.Message myself={message.from === loginUserData.uid}>
              {message.message}
            </St.Message>
          </>
        ) : (
          <>
            <St.Message myself={message.from === loginUserData.uid}>
              {message.message}
            </St.Message>
            <St.MessageTimeContainer>
              <St.MessageTime>{message.showedTime}</St.MessageTime>
            </St.MessageTimeContainer>
          </>
        )}
      </St.MessageContainer>
    </div>
  );
};

export default Message;
