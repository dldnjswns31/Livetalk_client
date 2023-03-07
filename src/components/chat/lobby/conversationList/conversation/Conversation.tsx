import styled from "styled-components";

import reactIcon from "../../../../../assets/react.svg";
import { useAppDispatch } from "../../../../../hooks";
import { saveSelectedUser } from "../../../../../redux/slice/selectedUserSlice";

const StConversationContainer = styled.div`
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

const StConversation = styled.div`
  flex: 5 0;
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
`;

const StConversationName = styled.div`
  flex: 1 0;
  display: flex;
  align-items: flex-end;
  margin-bottom: 0.2rem;
`;

const StConversationLastmessage = styled.div`
  flex: 1 0;
  display: flex;
  align-items: flex-start;
  margin-top: 0.2rem;
`;

const StTime = styled.div`
  flex: 1 0;
`;

const Conversation = ({
  user,
}: {
  user: { uid: string; nickname: string };
}) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(saveSelectedUser(user));
  };

  return (
    <StConversationContainer onClick={handleClick}>
      <StUserImage>
        <img src={reactIcon} alt="userImage" />
      </StUserImage>
      <StConversation>
        <StConversationName>
          <span>{user.nickname}</span>
        </StConversationName>
        <StConversationLastmessage>
          <span>마지막 메세지</span>
        </StConversationLastmessage>
      </StConversation>
      <StTime></StTime>
    </StConversationContainer>
  );
};

export default Conversation;
