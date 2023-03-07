import React from "react";
import styles from "./loading.module.css";

function index() {
  return (
    <div className={styles["body-spinner"]}>
      <div className={styles.feeder}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default index;
