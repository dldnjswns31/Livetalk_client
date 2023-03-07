import styled from "styled-components";

import reactIcon from "../../../../../assets/react.svg";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { saveSelectedUser } from "../../../../../redux/slice/selectedUserSlice";

const StUser = styled.div`
  display: inline-flex;
  align-items: center;
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

const StUserName = styled.div`
  flex: 5 0;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
`;

const StOnlineCheckContainer = styled.div`
  flex: 1 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const StOnlineCheck = styled.div<{ online: boolean }>`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ theme, online }) =>
    online ? theme.colors.green : theme.colors.red};
`;

interface IUserData {
  uid: string;
  nickname: string;
}

const User = ({
  userData,
  connectingUsers,
}: {
  userData: IUserData;
  connectingUsers: IUserData[];
}) => {
  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector((state) => state.selectedUser);

  // 유저 클릭했을 시
  const handleUserClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      !(e.target instanceof HTMLDivElement) ||
      selectedUser.uid === userData.uid
    )
      return;
    dispatch(saveSelectedUser(userData));
  };

  return (
    <StUser onClick={handleUserClick}>
      <StUserImage>
        <img src={reactIcon} alt="userImage" />
      </StUserImage>
      <StUserName>
        <span>{userData.nickname}</span>
      </StUserName>
      <StOnlineCheckContainer>
        {connectingUsers.find((user) => user.uid === userData.uid) ? (
          <StOnlineCheck online={true}></StOnlineCheck>
        ) : (
          <StOnlineCheck online={false}></StOnlineCheck>
        )}
      </StOnlineCheckContainer>
    </StUser>
  );
};

export default User;
