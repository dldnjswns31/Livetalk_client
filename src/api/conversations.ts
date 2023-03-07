import { conversationInstance } from "./instance";

const conversation = conversationInstance();

const conversationAPI = {
  getAllUsers: () => {
    return conversation("/");
  },
  getAllConverstaions: () => {
    return conversation("/conversations");
  },
};

export default conversationAPI;
