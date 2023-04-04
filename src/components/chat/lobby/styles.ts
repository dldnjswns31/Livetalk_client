import styled, { css } from "styled-components";

const LeftUpperBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
  background-color: ${({ theme }) => theme.colors.brown};
  color: ${({ theme }) => theme.colors.white};
`;

const Lobby = styled.div`
  display: flex;
  flex-direction: column;
  height: 80%;
  padding: 0 1rem;
  overflow-y: scroll;
`;

const LeftLowerBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;
`;

const UserOrChatroomButton = styled.button<{ selected: boolean }>`
  flex: 1 0;
  height: 100%;
  background: none;
  border: none;
  ${({ selected }) =>
    selected
      ? css`
          border-top: 3px solid ${({ theme }) => theme.colors.brown};
        `
      : css`
          border-top: 3px solid ${({ theme }) => theme.colors.white};
        `}

  color: ${({ theme }) => theme.colors.black};
`;

const styles = {
  LeftLowerBar,
  LeftUpperBar,
  Lobby,
  UserOrChatroomButton,
};

export default styles;
