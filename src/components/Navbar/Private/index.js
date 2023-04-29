import React, { useEffect, useState } from "react";
import styles from "./private.module.css";
import iconMsg from "../../../assets/icons/email.png";
import profileDefault from "../../../assets/images/user_profile.webp";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logoutAction } from "../../../redux/actions/auth";
import {
  onLoadingAction,
  offLoadingAction,
} from "../../../redux/actions/loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function NavbarPrivate() {
  const token = useSelector((state) => state.auth.userData.token);
  const photo = useSelector((state) => state.auth.userData.photo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [photoProfile, setPhotoProfile] = useState(profileDefault);
  const { pathname } = location;

  const handleMenuProfile = () => setIsMenuOpen(!isMenuOpen);
  const handlerLogout = (token) => {
    if (pathname === "/profile") {
      navigate("/");
    }
    dispatch(onLoadingAction());
    Swal.fire({
      title: "Are you sure you want to log out?",
      showCancelButton: true,
      confirmButtonText: "Logout",
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(logoutAction(token))
          .then((res) => {
            const { type } = res.action;
            if (type === "AUTH_LOGOUT_FULFILLED") {
              toast.success("Logout successfully ..", {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
              });
              const waitingToast = setTimeout(() => {
                return navigate("/");
              }, 2000);
              dispatch(offLoadingAction());
              return waitingToast;
            }
          })
          .catch((err) => {
            dispatch(offLoadingAction());
            if (err)
              return toast.error("Logout failed, please check again ..", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "colored",
              });
          });
      } else if (res.isDismissed) {
        dispatch(offLoadingAction());
      }
    });
  };

  // const checkPhoto = async (photo) => {
  //   console.log("PHOTO : ", photo);
  //   if (photo === null) return setPhotoProfile(profileDefault);
  //   if (photo) {
  //     const fetchPhoto = photo;
  //     const res = await fetch(fetchPhoto);
  //     const status = res.status;
  //     if (status === 404) return setPhotoProfile(profileDefault);
  //   }
  // };

  useEffect(() => {
    if (photo !== null) {
      setPhotoProfile(photo);
    }
  }, [photo]);

  return (
    <>
      <li className={styles["wrapper-icon"]}>
        <img src={iconMsg} alt="icon" width={30} />
        <div className={styles.circle1}>1</div>
      </li>
      <li className={styles["wrapper-img-profile"]} onClick={handleMenuProfile}>
        <img src={photoProfile} alt="icon" className={styles["profile-img"]} />
        <ul
          className={`${styles["wrapper-menu"]} ${
            isMenuOpen ? styles["open"] : null
          }`}>
          <li>
            <Link to="profile">Profile</Link>
          </li>
          <li onClick={() => handlerLogout(token)}>Log Out</li>
        </ul>
      </li>
    </>
  );
}

export default NavbarPrivate;
