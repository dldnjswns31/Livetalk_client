import { Route, Routes } from "react-router-dom";
import HomeRoute from "./routes/HomeRoute";
import SignupRoute from "./routes/SignupRoute";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/signup" element={<SignupRoute />} />
    </Routes>
  );
};

export default Router;
