import { convertMessageTime } from "./convertDate";

const removeDuplicateDate = (
  messages: {
    from: string;
    to: string;
    message: string;
    _id: string;
    createdAt: string;
    isRead: string;
  }[]
) => {
  messages = messages.map((item) => {
    let date = convertMessageTime(item.createdAt);
    if (date) item.createdAt = date;
    return item;
  });

  let prevFrom = "";
  let prevTime = "";
  // 가장 최근 메세지부터 확인
  for (let i = messages.length - 1; i >= 0; i--) {
    // 이전 메세지와 보낸이가 다르거나 시간이 다르면 변수 갱신
    if (prevFrom !== messages[i].from || prevTime !== messages[i].createdAt) {
      prevFrom = messages[i].from;
      prevTime = messages[i].createdAt;
    } else {
      messages[i].createdAt = "";
    }
  }
  return messages;
};

export default removeDuplicateDate;
