import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";
import Swal from "sweetalert2";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { expiredTokenAction } from "../../redux/actions/auth";

function Layout() {
  const token = useSelector((state) => state.auth.userData.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (token.length !== 0) {
    const expirationTime = jwtDecode(token).exp * 1000 - 60000;
    const dateExpired = new Date(expirationTime);
    // Fri Mar 17 2023 00:23:22
    const dateNow = new Date();
    const expired = dateExpired < dateNow;

    if (expired) {
      Swal.fire({
        title: "TOKEN EXPIRED",
        text: "Please login again",
        showConfirmButton: true,
        icon: "warning",
        confirmButtonText: "Login",
      }).then(function (props) {
        const { isConfirmed } = props;
        if (isConfirmed) {
          dispatch(expiredTokenAction());
          return navigate("/login");
        }
      });
    }
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
