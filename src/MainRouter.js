import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layouts";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VehicleType from "./pages/Vehicles";
import History from "./pages/History";
import About from "./pages/About";
import Loading from "./components/Loading";
import ErrorPage from "./pages/ErrorPage";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/vehicle-type" element={<VehicleType />} />
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
