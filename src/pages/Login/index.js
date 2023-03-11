import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./login.module.css";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import iconGoogle from "../../assets/icons/icon_google.png";
import iconCars from "../../assets/icons/icon-cars.webp";
import { loginAction } from "../../redux/actions/auth";
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handlerEmail = (e) => {
    setInput({
      ...input,
      email: e.target.value,
    });
  };

  const handlerPassword = (e) => {
    setInput({
      ...input,
      password: e.target.value,
    });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginAction(input))
      .then((res) => {
        const { type } = res.action;

        if (type === "AUTH_LOGIN_FULFILLED") {
          toast.success("Login successfully ..", {
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
          return toast.error("Login failed, please check again ..", {
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
      <section className={styles["wrapper-login"]}>
        <div className={styles.left}>
          <p>
            let&apos;s Explorer <br /> The World
          </p>
          <p>Don&apos;t have account ?</p>
          <button>
            <Link to="/register">Sign Up</Link>
          </button>
        </div>

        <div className={styles["pole"]}>
          <div className={styles["round1"]}></div>
          <div className={styles["round2"]}></div>
        </div>

        <div className={styles.right}>
          <p>Login</p>
          <h1>
            Vehicle rental <img src={iconCars} alt="icon" width={50} />
          </h1>
          <form onSubmit={handlerSubmit}>
            <input type="email" placeholder="Email" onChange={handlerEmail} />
            <input
              type="password"
              placeholder="Password"
              onChange={handlerPassword}
            />
            <Link className={styles.link} to="/forgot-password">
              Forgot Password
            </Link>
            <button type="submit">Login</button>
          </form>

          <button className={styles["btn-login-google"]}>
            <img src={iconGoogle} alt="icon" width={16} />
            Login with Google
          </button>
          <button className={styles["btn-register-mobile"]}>
            <Link to="/register">Sign Up</Link>
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Login;
