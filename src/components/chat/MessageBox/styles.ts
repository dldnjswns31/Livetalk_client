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
`;

const MessageTimeContainer = styled.div`
  display: inline-flex;
  align-items: flex-end;
  height: 100%;
  margin: 0 0.5rem 0 0.5rem;
`;

const MessageTime = styled.span`
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
  MessageTime,
  MessageTimeContainer,
};

export default styles;
