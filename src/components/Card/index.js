import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import vehicleDefault from "../../assets/images/vehicle-default.jpg";

function index({ vehicleImage, vehicleName, city }) {
  const [photo, setPhoto] = useState(vehicleDefault);

  useEffect(() => {
    if (vehicleImage) {
      setPhoto(vehicleImage[0]);
    } else {
      setPhoto(vehicleDefault);
    }
  }, []);

  return (
    <div className={styles.card}>
      <img src={photo} alt="vehicle" className={styles["img-vehicle"]} />
      <div className={styles["wrapper-title"]}>
        <span>{vehicleName || "Vechicle Name"}</span>
        <span>{city || "Location"}</span>
      </div>
    </div>
  );
}

export default index;
