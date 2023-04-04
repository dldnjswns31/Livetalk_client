import styled from "styled-components";

// ConversationList
const NotifyContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

//Conversation
const ConversationContainer = styled.div`
  display: inline-flex;
  width: 100%;
  height: 4rem;
`;

const UserImage = styled.div`
  display: inline-flex;
  width: 3rem;
  justify-content: center;
  align-items: center;

  img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const Conversation = styled.div`
  flex: 4 0;
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
`;

const ConversationName = styled.div`
  flex: 1 0;
  display: flex;
  align-items: flex-end;
  margin-bottom: 0.2rem;
`;

const ConversationLastmessage = styled.div`
  flex: 1 0;
  display: flex;
  align-items: flex-start;
  margin-top: 0.2rem;

  span {
    color: ${({ theme }) => theme.colors.gray_4};
    font-size: 0.8rem;
    word-break: break-all;
  }
`;

const TimeAndUnread = styled.div`
  flex: 2 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-end;
  padding: 1rem 0;
`;

const Time = styled.span`
  margin-bottom: 0.25rem;
  color: ${({ theme }) => theme.colors.gray_4};
  font-size: 0.8rem;
`;

const Unread = styled.span`
  display: inline-block;
  height: 20px;
  padding: 6px 8px;
  background-color: ${({ theme }) => theme.colors.red};
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.8rem;
  font-weight: 700;
`;

const styles = {
  Conversation,
  ConversationContainer,
  ConversationLastmessage,
  ConversationName,
  NotifyContainer,
  TimeAndUnread,
  UserImage,
  Time,
  Unread,
};

export default styles;
