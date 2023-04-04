import styled from "styled-components";

const ChatContainer = styled.div`
  display: inline-flex;
  min-width: 800px;
  min-height: 600px;
  max-height: 700px;
  width: 60vw;
  height: 70vh;
  background-color: ${({ theme }) => theme.colors.white};
`;

const ChatLeftContainer = styled.div`
  display: inline-block;
  width: 50%;
  height: 100%;
`;

const ChatRightContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.dark_blue};
`;

const styles = {
  ChatContainer,
  ChatLeftContainer,
  ChatRightContainer,
};

export default styles;
