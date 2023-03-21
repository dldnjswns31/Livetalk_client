import { useContext, useEffect, useState } from "react";
import conversationAPI from "../../../../api/conversations";
import { SocketContext } from "../../../../context/SocketContext";
import { useAppSelector } from "../../../../hooks";
import useSocket from "../../../../hooks/useSocket";
import User from "./user/User";

const UserList = () => {
  const [userList, setUserList] = useState<{ uid: string; nickname: string }[]>(
    []
  );

  const [connectingUsers, setConnectingUsers] = useState<
    { uid: string; nickname: string }[]
  >([]);

  const loginUserData = useAppSelector((state) => state.user);
  const socket = useContext(SocketContext);

  // DB 유저 목록 불러오기
  useEffect(() => {
    if (loginUserData.uid) {
      conversationAPI.getAllUsers().then((res) => {
        const users = res.data.data.filter(
          (user: { uid: string; nickname: string }) =>
            user.uid !== loginUserData.uid
        );
        setUserList(users);
      });
    }
  }, [loginUserData]);

  // 유저 입/퇴장시 접속 유저 목록 갱신
  useEffect(() => {
    if (socket) {
      socket.emit("getUserlist");

      socket.on("userlist", (data: { uid: string; nickname: string }[]) => {
        setConnectingUsers(data);
      });

      return () => {
        socket.removeListener("userlist");
      };
    }
  }, [socket]);

  return (
    <>
      {userList.length && connectingUsers.length
        ? userList.map((userData, index) => {
            return (
              <User
                key={index}
                userData={userData}
                connectingUsers={connectingUsers}
              />
            );
          })
        : null}
    </>
  );
};

export default UserList;
