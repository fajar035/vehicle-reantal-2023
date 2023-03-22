import React from "react";
import Ball from "../../assets/icons/ball.svg";
import styles from "./styles.module.css";
import MovingText from "react-moving-text";

function index() {
  return (
    <div className={styles["container-loading"]}>
      <div className={styles["wrapper-loading"]}>
        <MovingText
          type="typewriter"
          dataText={[
            "Loading ...",
            "Please Wait ...",
            "Errors may occur",
            "I apologize.",
          ]}
        />
      </div>
      <img src={Ball} alt="ball" />
    </div>
  );
}

export default index;
