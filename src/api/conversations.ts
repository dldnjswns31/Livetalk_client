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
    return conversation("/conversations/query", { params: { uid } });
  },
  sendMessage: (message: string, to: string) => {
    return conversation.post("/message", {
      message,
      to,
    });
  },
};

export default conversationAPI;
