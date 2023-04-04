import styled from "styled-components";

// User
const User = styled.div`
  display: inline-flex;
  align-items: center;
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

const UserName = styled.div`
  flex: 5 0;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
`;

const OnlineCheckContainer = styled.div`
  flex: 1 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const OnlineCheck = styled.div<{ online: boolean }>`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ theme, online }) =>
    online ? theme.colors.green : theme.colors.red};
`;

const styles = {
  OnlineCheck,
  OnlineCheckContainer,
  User,
  UserImage,
  UserName,
};

export default styles;
