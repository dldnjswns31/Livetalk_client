import { Route, Routes } from "react-router-dom";
import ChatRoute from "./routes/ChatRoute";
import LoginRoute from "./routes/LoginRoute";
import SignupRoute from "./routes/SignupRoute";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/signup" element={<SignupRoute />} />
      <Route path="/chat" element={<ChatRoute />} />
    </Routes>
  );
};

export default Router;
