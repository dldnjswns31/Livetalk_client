import styled from "styled-components";

// MessageBox
const ChattingTitle = styled.div`
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

const ChattingContent = styled.div`
  width: 100%;
  padding: 1rem;
  flex: 8 0;
  overflow-y: scroll;
`;

const ChattingFormContainer = styled.div`
  display: block;
  width: 100%;
  flex: 1 0;
`;

const ChattingForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};

  textarea {
    flex: 8 0;
    height: 100%;
    padding: 0.5rem;
    border: none;
    outline: none;
    font-family: "Arial", sans-serif;
    resize: none;
  }

  div {
    display: inline-flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex: 2 0;
  }
`;

const SubmitButton = styled.button<{ isActive: boolean }>`
  display: inline-block;
  width: 100%;
  height: 100%;
  border: none;
  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.yellow : theme.colors.gray_2};
  color: ${({ isActive, theme }) =>
    isActive ? theme.colors.black : theme.colors.gray_1};
`;

// Message

const DateDivideContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`;

const DateDivide = styled.div`
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.dark_blue_2};
  border-radius: 1rem;
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.6rem;
`;

const MessageContainer = styled.div<{ myself: boolean }>`
  display: inline-flex;
  justify-content: ${({ myself }) => (myself ? "right" : "left")};
  align-items: flex-end;
  width: 100%;
  padding: 0 1rem;
  margin-bottom: 0.5rem;
`;

const Message = styled.span<{ myself: boolean }>`
  max-width: 60%;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: ${({ theme, myself }) =>
    myself ? theme.colors.yellow : theme.colors.white};
  word-break: break-all;
  white-space: pre-line;
`;

const MessageTimeUnreadContainer = styled.div<{ myself: boolean }>`
  display: inline-flex;
  flex-direction: column;
  align-items: ${({ myself }) => (myself ? "flex-end" : "flex-start")};
  height: 100%;
  margin: 0 0.5rem 0 0.5rem;
`;

const Unread = styled.span`
  color: ${({ theme }) => theme.colors.yellow};
  font-size: 0.6rem;
  font-weight: 700;
`;

const MessageTime = styled.span`
  margin-top: 0.25rem;
  color: ${({ theme }) => theme.colors.gray_4};
  font-size: 0.6rem;
`;

const styles = {
  ChattingContent,
  ChattingForm,
  ChattingFormContainer,
  ChattingTitle,
  DateDivide,
  DateDivideContainer,
  Message,
  MessageContainer,
  MessageTimeUnreadContainer,
  MessageTime,
  SubmitButton,
  Unread,
};

export default styles;
