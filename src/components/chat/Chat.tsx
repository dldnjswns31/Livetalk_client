import withAuth from "../HOC/withAuth";
import { useAppSelector } from "../../hooks";
import { Lobby } from "./lobby";
import { MessageBox } from "./messageBox";
import St from "./styles";

const Chat = () => {
  const selectedUser = useAppSelector((state) => state.selectedUser);

  return (
    <St.ChatContainer>
      <St.ChatLeftContainer>
        <Lobby />
      </St.ChatLeftContainer>
      <St.ChatRightContainer>
        {Object.keys(selectedUser).length ? (
          <MessageBox />
        ) : (
          <span>채팅방을 열어주세요.</span>
        )}
      </St.ChatRightContainer>
    </St.ChatContainer>
  );
};

export default withAuth(Chat, true);
