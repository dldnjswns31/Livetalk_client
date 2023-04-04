import { conversationInstance } from "./instance";

const conversation = conversationInstance();

const conversationAPI = {
  getAllUsers: () => {
    return conversation("/");
  },
  getAllConverstaions: () => {
    return conversation("/conversations");
  },
  getConversation: (uid: string) => {
    return conversation("/conversations/user", { params: { uid } });
  },
  getMoreMessage: (uid: string, messageID: string) => {
    return conversation("/conversations/message", {
      params: { messageID, uid },
    });
  },
};

export default conversationAPI;
