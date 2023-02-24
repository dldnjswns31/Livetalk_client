import { Route, Routes } from "react-router-dom";
import LoginRoute from "./routes/LoginRoute";
import SignupRoute from "./routes/SignupRoute";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginRoute />} />
      <Route path="/signup" element={<SignupRoute />} />
    </Routes>
  );
};

export default Router;
