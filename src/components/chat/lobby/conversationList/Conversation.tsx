import reactIcon from "../../../../assets/react.svg";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { saveSelectedUser } from "../../../../redux/slice/selectedUserSlice";
import { convertConversationDate } from "../../../../utils/convertDate";
import St from "./styles";

interface IProps {
  conversation: {
    createdAt: string;
    lastMessage: string;
    participantObj: {
      _id: string;
      nickname: string;
    }[];
    updatedAt: string;
    __v: string;
    _id: string;
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
        <img src={reactIcon} alt="userImage" />
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
      <St.Time>{convertConversationDate(conversation.updatedAt)}</St.Time>
    </St.ConversationContainer>
  );
};

export default Conversation;
