const convertDate = (time: string) => {
  const formattedTime = new Date(time);
  const now = new Date();
  const diffTime = now.getTime() - formattedTime.getTime();
  const dayDiff = Math.floor(diffTime / (1000 * 3600 * 24));

  if (dayDiff === 0 && formattedTime.getDate() === now.getDate()) {
    // 오늘 날짜와 동일한 경우, 오전/오후 hh:mm 형식으로 반환
    let hours = formattedTime.getHours();
    const minutes = formattedTime.getMinutes();
    const ampm = hours >= 12 ? "오후" : "오전";
    hours = hours % 12;
    hours = hours ? hours : 12; // 0시를 12시로 변환
    const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${ampm} ${hoursStr}:${minutesStr}`;
  } else if (dayDiff === 0) {
    return "어제";
  } else {
    // 어제보다 이전인 경우, "월 일" 형식으로 반환
    const month = formattedTime.getMonth() + 1;
    const day = formattedTime.getDate();
    return `${month}월 ${day}일`;
  }
};

export default convertDate;
