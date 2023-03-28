import { convertMessageTime } from "./convertDate";

const removeDuplicateDate = (
  messages: {
    from: string;
    to: string;
    message: string;
    _id: string;
    createdAt: string;
    isRead: string;
    formattedDate: string;
    formattedTime: string;
    showedTime: string;
    showedDate: string;
  }[]
) => {
  messages = messages.map((item) => {
    let { messageTime, messageDate } = convertMessageTime(item.createdAt);

    item.formattedTime = messageTime;
    item.formattedDate = messageDate;

    return item;
  });

  messages[0].showedDate = messages[0].formattedDate;
  let prevDate = messages[0].formattedDate;

  for (let i = 1; i < messages.length; i++) {
    let prevMessage = messages[i - 1];
    let currentMessage = messages[i];

    // 메세지 시간 묶음
    if (
      prevMessage.formattedTime === currentMessage.formattedTime &&
      prevMessage.from === currentMessage.from
    ) {
      prevMessage.showedTime = "";
    } else {
      prevMessage.showedTime = prevMessage.formattedTime;
    }

    // 날짜 구분선
    if (prevDate === currentMessage.formattedDate) {
      prevDate = currentMessage.formattedDate;
      currentMessage.showedDate = "";
    } else {
      prevDate = currentMessage.formattedDate;
      currentMessage.showedDate = currentMessage.formattedDate;
    }
  }

  messages[messages.length - 1].showedTime =
    messages[messages.length - 1].formattedTime;

  return messages;
};

export default removeDuplicateDate;
