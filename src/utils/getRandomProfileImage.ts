const character = ["neo", "ryan", "tube"];
const MAX_NUM = 7;

const getRandomProfileImage = () => {
  const randomCharacter = Math.floor(Math.random() * character.length);
  const randomIndex = Math.floor(Math.random() * MAX_NUM) + 1;
  const fileName = character[randomCharacter] + randomIndex + ".jpeg";
  //   const fileURL = `/profileImage/${fileName}`;
  const fileURL = `${import.meta.env.BASE_URL}profileImage/${fileName}`;
  return fileURL;
};

export default getRandomProfileImage;
