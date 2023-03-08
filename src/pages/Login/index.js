import React from "react";
import styles from "./login.module.css";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import iconGoogle from "../../assets/icons/icon_google.png";
import iconCars from "../../assets/icons/icon-cars.webp";

function Login() {
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
          <form>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <Link className={styles.link} to="/forgot-password">
              Forgot Password
            </Link>
          </form>

          <button>Login</button>
          <button>
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
