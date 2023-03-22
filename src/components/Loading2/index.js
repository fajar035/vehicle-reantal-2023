import React from "react";
import Ball from "../../assets/icons/ball.svg";
import styles from "./styles.module.css";

function index() {
  return (
    <div className={styles["container-loading"]}>
      <img src={Ball} alt="ball" />
    </div>
  );
}

export default index;
