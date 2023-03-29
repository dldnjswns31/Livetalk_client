import styled from "styled-components";
import { useAppSelector } from "../../../../hooks";

const StDateDivideContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`;

const StDateDivide = styled.div`
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.dark_blue_2};
  border-radius: 1rem;
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.6rem;
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

const StMessageTimeContainer = styled.div`
  display: inline-flex;
  align-items: flex-end;
  height: 100%;
  margin: 0 0.5rem 0 0.5rem;
`;

const StMessageTime = styled.span`
  color: ${({ theme }) => theme.colors.gray_4};
  font-size: 0.6rem;
`;

const Message = ({
  message,
  firstMessageRef,
}: {
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
}) => {
  const loginUserData = useAppSelector((state) => state.user);
  return (
    <div ref={firstMessageRef}>
      {message.showedDate && (
        <StDateDivideContainer>
          <StDateDivide>{message.showedDate}</StDateDivide>
        </StDateDivideContainer>
      )}
      <StMessageContainer myself={message.from === loginUserData.uid}>
        {message.from === loginUserData.uid ? (
          <>
            <StMessageTimeContainer>
              <StMessageTime>{message.showedTime}</StMessageTime>
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
              <StMessageTime>{message.showedTime}</StMessageTime>
            </StMessageTimeContainer>
          </>
        )}
      </StMessageContainer>
    </div>
  );
};

export default Message;
