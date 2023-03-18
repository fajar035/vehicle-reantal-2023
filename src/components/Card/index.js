import React from "react";
import styles from "./styles.module.css";
import vehicleDefault from "../../assets/images/vehicle-default.jpg";

function index() {
  return (
    <div className={styles.card}>
      <img
        src={vehicleDefault}
        alt="vehicle"
        className={styles["img-vehicle"]}
      />
      <div className={styles["wrapper-title"]}>
        <span>Car</span>
        <span>City</span>
      </div>
    </div>
  );
}

export default index;
