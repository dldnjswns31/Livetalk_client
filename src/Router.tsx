import { Route, Routes } from "react-router-dom";
import { ChatPage, LoginPage, SignupPage } from "./pages";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<ChatPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
};

export default Router;
