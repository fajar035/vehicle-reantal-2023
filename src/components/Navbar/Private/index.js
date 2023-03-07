import React from "react";
import styles from "./private.module.css";
import { Link } from "react-router-dom";

function NavbarPrivate() {
  return (
    <>
      <li>
        <button className={`${styles.btn} ${styles["btn-login"]}`}>
          <Link to={"/login"} className={styles.link}>
            Login
          </Link>
        </button>
      </li>
      <li>
        <button className={`${styles.btn} ${styles["btn-register"]}`}>
          <Link to={"/register"} className={styles.link}>
            Register
          </Link>
        </button>
      </li>
    </>
  );
}

export default NavbarPrivate;
