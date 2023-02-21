import { Route, Routes } from "react-router-dom";
import ChatRoute from "./routes/ChatRoute";
import HomeRoute from "./routes/HomeRoute";
import SignupRoute from "./routes/SignupRoute";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/signup" element={<SignupRoute />} />
      <Route path="/chat" element={<ChatRoute />} />
    </Routes>
  );
};

export default Router;
