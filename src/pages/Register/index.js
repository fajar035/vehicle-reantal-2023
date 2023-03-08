import React from "react";
import styles from "./register.module.css";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import iconGoogle from "../../assets/icons/icon_google.png";
import iconCars from "../../assets/icons/icon-cars.webp";

function Register() {
  return (
    <>
      <section className={styles["wrapper-login"]}>
        <div className={styles.left}>
          <p>
            let&apos;s Explorer <br /> The World
          </p>
          <p>Already have an account ?</p>
          <button>
            <Link to="/login">Login</Link>
          </button>
        </div>

        <div className={styles["pole"]}>
          <div className={styles["round1"]}></div>
          <div className={styles["round2"]}></div>
        </div>

        <div className={styles.right}>
          <p>Sign Up</p>
          <h1>
            Vehicle rental <img src={iconCars} alt="icon" width={50} />
          </h1>
          <form>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
          </form>

          <button>Sign Up</button>
          <button>
            <img src={iconGoogle} alt="icon" width={16} />
            Sign up with Google
          </button>
          <button className={styles["btn-register-mobile"]}>
            <Link to="/login">Login</Link>
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Register;
