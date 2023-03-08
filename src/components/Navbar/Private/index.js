import React, { useState } from "react";
import styles from "./private.module.css";
import iconMsg from "../../../assets/icons/email.png";
import profileDefault from "../../../assets/images/user_profile.webp";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../../redux/actions/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function NavbarPrivate() {
  const token = useSelector((state) => state.auth.userData.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuProfile = () => setIsMenuOpen(!isMenuOpen);

  const handlerLogout = (token) => {
    dispatch(logoutAction(token))
      .then((res) => {
        const { type } = res.action;

        if (type === "AUTH_LOGOUT_FULFILLED") {
          toast.success("Logout successfully ..", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
          const waitingToast = setTimeout(() => {
            return navigate("/");
          }, 3000);
          return waitingToast;
        }
      })
      .catch((err) => {
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
  };

  return (
    <>
      <li className={styles["wrapper-icon"]}>
        <img src={iconMsg} alt="icon" width={30} />
        <div className={styles.circle1}>1</div>
      </li>
      <li className={styles["wrapper-img-profile"]} onClick={handleMenuProfile}>
        <img
          src={profileDefault}
          alt="icon"
          className={styles["profile-img"]}
        />
        <ul
          className={`${styles["wrapper-menu"]} ${
            isMenuOpen ? styles["open"] : null
          }`}>
          <li>Profile</li>
          <li onClick={() => handlerLogout(token)}>Log Out</li>
        </ul>
      </li>
    </>
  );
}

export default NavbarPrivate;
