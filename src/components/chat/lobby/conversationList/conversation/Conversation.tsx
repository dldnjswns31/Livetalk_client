import styled from "styled-components";

import reactIcon from "../../../../../assets/react.svg";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
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
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IConversationProps {
  createdAt: string;
  lastMessage: string;
  participantObj: {
    _id: string;
    nickname: string;
  }[];
  updatedAt: string;
  __v: string;
  _id: string;
}

const Conversation = ({
  conversation,
}: {
  conversation: IConversationProps;
}) => {
  const loginUserData = useAppSelector((state) => state.user);
  const selectedUser = useAppSelector((state) => state.selectedUser);
  const dispatch = useAppDispatch();

  const findUser = (arr: { _id: string; nickname: string }[]) => {
    for (let user of arr) {
      if (user._id !== loginUserData.uid) {
        return { uid: user._id, nickname: user.nickname };
      }
    }
    return null;
  };

  const handleClick = () => {
    const user = findUser(conversation.participantObj);
    if (user && user.uid !== selectedUser.uid) {
      dispatch(saveSelectedUser(user));
    }
  };

  return (
    <StConversationContainer onClick={handleClick}>
      <StUserImage>
        <img src={reactIcon} alt="userImage" />
      </StUserImage>
      <StConversation>
        <StConversationName>
          <span>{findUser(conversation.participantObj)?.nickname}</span>
        </StConversationName>
        <StConversationLastmessage>
          <span>{conversation.lastMessage}</span>
        </StConversationLastmessage>
      </StConversation>
      <StTime>{conversation.updatedAt}</StTime>
    </StConversationContainer>
  );
};

export default Conversation;
