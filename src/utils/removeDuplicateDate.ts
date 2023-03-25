import { convertMessageTime } from "./convertDate";

const removeDuplicateDate = (
  messages: {
    from: string;
    to: string;
    message: string;
    _id: string;
    createdAt: string;
    isRead: string;
    date: string;
  }[]
) => {
  messages = messages.map((item) => {
    let { messageTime, messageDate } = convertMessageTime(item.createdAt);
    item.createdAt = messageTime;
    item.date = messageDate;
    return item;
  });

  let prevDate = messages[0].date;

  for (let i = 1; i < messages.length; i++) {
    let prevMessage = messages[i - 1];
    let currentMessage = messages[i];
    if (
      prevMessage.createdAt === currentMessage.createdAt &&
      prevMessage.from === currentMessage.from
    )
      prevMessage.createdAt = "";

    if (prevDate === currentMessage.date) {
      prevDate = currentMessage.date;
      currentMessage.date = "";
    } else {
      prevDate = currentMessage.date;
    }
  }
  return messages;
};

export default removeDuplicateDate;
