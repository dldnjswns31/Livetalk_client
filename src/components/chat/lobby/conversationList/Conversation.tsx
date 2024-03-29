import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { saveSelectedUser } from "../../../../redux/slice/selectedUserSlice";
import { convertConversationDate } from "../../../../utils/convertDate";
import getRandomProfileImage from "../../../../utils/getRandomProfileImage";
import St from "./styles";

interface IProps {
  conversation: {
    _id: string;
    lastMessage: string;
    updatedAt: string;
    unreadCount?: number;
    participantObj: {
      _id: string;
      nickname: string;
    }[];
  };
}

const Conversation = ({ conversation }: IProps) => {
  const loginUserData = useAppSelector((state) => state.user);
  const selectedUser = useAppSelector((state) => state.selectedUser);
  const dispatch = useAppDispatch();

  function handleClick() {
    const user = findUser(conversation.participantObj);
    if (user && user.uid !== selectedUser.uid) {
      dispatch(saveSelectedUser(user));
    }
  }

  function findUser(arr: { _id: string; nickname: string }[]) {
    for (let user of arr) {
      if (user._id !== loginUserData.uid) {
        return { uid: user._id, nickname: user.nickname };
      }
    }
    return null;
  }

  return (
    <St.ConversationContainer onClick={handleClick}>
      <St.UserImage>
        <img src={`${getRandomProfileImage()}`} alt="userImage" />
      </St.UserImage>
      <St.Conversation>
        <St.ConversationName>
          <span>{findUser(conversation.participantObj)?.nickname}</span>
        </St.ConversationName>
        <St.ConversationLastmessage>
          <span>
            {conversation.lastMessage.length > 50
              ? conversation.lastMessage.slice(0, 30) + "..."
              : conversation.lastMessage}
          </span>
        </St.ConversationLastmessage>
      </St.Conversation>
      <St.TimeAndUnread>
        <St.Time>{convertConversationDate(conversation.updatedAt)}</St.Time>
        {conversation.unreadCount ? (
          <St.Unread>
            {conversation.unreadCount > 300 ? "300+" : conversation.unreadCount}
          </St.Unread>
        ) : null}
      </St.TimeAndUnread>
    </St.ConversationContainer>
  );
};

export default Conversation;
