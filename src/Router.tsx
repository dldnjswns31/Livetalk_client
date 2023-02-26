import { Route, Routes } from "react-router-dom";
import ChatRoute from "./routes/ChatRoute";
import LoginRoute from "./routes/LoginRoute";
import SignupRoute from "./routes/SignupRoute";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ChatRoute />} />
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/signup" element={<SignupRoute />} />
    </Routes>
  );
};

export default Router;
