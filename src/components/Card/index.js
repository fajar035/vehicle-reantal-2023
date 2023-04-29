import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import vehicleDefault from "../../assets/images/vehicle-default.jpg";

function index({ vehicleImage, vehicleName, city }) {
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    if (vehicleImage) {
      setPhoto(vehicleImage[2]);
    }
  }, []);

  return (
    <div className={styles.card}>
      <img
        src={vehicleImage !== null ? photo : vehicleDefault}
        alt="vehicle"
        className={styles["img-vehicle"]}
      />
      <div className={styles["wrapper-title"]}>
        <span>{vehicleName}</span>
        <span>{city}</span>
      </div>
    </div>
  );
}

export default index;
