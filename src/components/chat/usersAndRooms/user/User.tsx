import styled from "styled-components";
import reactIcon from "../../../../assets/react.svg";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { saveSelectedUser } from "../../../../redux/slice/selectedUserSlice";

const StUser = styled.div`
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

const StUserName = styled.div`
  flex: 5 0;
  display: flex;
  align-items: center;
  padding: 0 0.5rem;
`;

interface IUserData {
  uid: string;
  nickname: string;
  messages: any[];
}

const User = ({ userData }: { userData: IUserData }) => {
  const loginUserData = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  // 유저 클릭했을 시
  const handleUserClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLDivElement)) return;
    const uid = userData.uid;
    if (uid !== loginUserData.uid) dispatch(saveSelectedUser(userData));
  };

  return (
    <StUser onClick={handleUserClick}>
      <StUserImage>
        <img src={reactIcon} alt="userImage" />
      </StUserImage>
      <StUserName>
        <span>
          {loginUserData.uid === userData.uid
            ? `나 (${userData.nickname})`
            : userData.nickname}
        </span>
      </StUserName>
    </StUser>
  );
};

export default User;
