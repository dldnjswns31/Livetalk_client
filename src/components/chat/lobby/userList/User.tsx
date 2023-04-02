import reactIcon from "../../../../assets/react.svg";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { saveSelectedUser } from "../../../../redux/slice/selectedUserSlice";
import getRandomProfileImage from "../../../../utils/getRandomProfileImage";
import St from "./styles";

interface IUserData {
  uid: string;
  nickname: string;
}

interface IProps {
  userData: IUserData;
  connectingUsers: IUserData[];
}

const User = ({ userData, connectingUsers }: IProps) => {
  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector((state) => state.selectedUser);

  function handleUserClick(e: React.MouseEvent<HTMLDivElement>) {
    if (
      !(e.target instanceof HTMLDivElement) ||
      selectedUser.uid === userData.uid
    )
      return;
    dispatch(saveSelectedUser(userData));
  }

  return (
    <St.User onClick={handleUserClick}>
      <St.UserImage>
        <img src={getRandomProfileImage()} alt="userImage" />
      </St.UserImage>
      <St.UserName>
        <span>{userData.nickname}</span>
      </St.UserName>
      <St.OnlineCheckContainer>
        {connectingUsers.find((user) => user.uid === userData.uid) ? (
          <St.OnlineCheck online={true}></St.OnlineCheck>
        ) : (
          <St.OnlineCheck online={false}></St.OnlineCheck>
        )}
      </St.OnlineCheckContainer>
    </St.User>
  );
};

export default User;
