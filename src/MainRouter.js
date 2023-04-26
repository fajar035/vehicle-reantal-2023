import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layouts";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import VehicleType from "./pages/Vehicles";
import Popular from "./pages/Vehicles/Popular";
import Cars from "./pages/Vehicles/Cars";
import Bikes from "./pages/Vehicles/Bikes";
import MotorBikes from "./pages/Vehicles/Motorbikes";
import History from "./pages/History";
import About from "./pages/About";
import Profile from "./pages/Profile/index";
import Loading from "./components/Loading2";
import ErrorPage from "./pages/ErrorPage";
import ScrollToTop from "./utils/hooks/scrollToTop";
import { useSelector } from "react-redux";

const MainRouter = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const token = useSelector((state) => state.auth.userData.token);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <ScrollToTop>
            <Routes>
              <Route path="/loading" element={<Loading />} />
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/vehicle-type" element={<VehicleType />}>
                  <Route path="/vehicle-type/popular" element={<Popular />} />
                  <Route path="/vehicle-type/cars" element={<Cars />} />
                  <Route path="/vehicle-type/bikes" element={<Bikes />} />
                  <Route
                    path="/vehicle-type/motorbikes"
                    element={<MotorBikes />}
                  />
                </Route>
                <Route path="/about" element={<About />} />
                {/* PRIVATE ROUTE */}
                <Route
                  path="/history"
                  element={token.length !== 0 ? <History /> : <PrivateRoute />}
                />
                <Route
                  path="/profile"
                  element={token.length !== 0 ? <Profile /> : <PrivateRoute />}
                />
                {/* PRIVATE ROUTE */}
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </ScrollToTop>
        </BrowserRouter>
      )}
    </>
  );
};

export default MainRouter;
