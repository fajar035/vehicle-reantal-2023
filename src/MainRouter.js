import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layouts";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VehicleType from "./pages/Vehicles";
import History from "./pages/History";
import About from "./pages/About";
import Profile from "./pages/Profile/index";
import Loading from "./components/Loading";
import ErrorPage from "./pages/ErrorPage";
import ScrollToTop from "./utils/hooks/scrollToTop";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/vehicle-type" element={<VehicleType />} />
            <Route path="/history" element={<History />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default MainRouter;
