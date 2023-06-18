import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import vehicleDefault from "../../assets/images/vehicle-default.jpg";
import { useNavigate } from "react-router-dom";

function index({ vehicleImage, vehicleName, data }) {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(vehicleDefault);

  const handlerLink = () =>
    navigate(
      `/vehicle-type/${data.category.toLowerCase()}/${
        data.id_vehicle ? data.id_vehicle : data.id
      }`
    );

  useEffect(() => {
    if (vehicleImage) {
      setPhoto(vehicleImage[0]);
    } else {
      setPhoto(vehicleDefault);
    }
  }, [data]);

  return (
    <div className={styles["container-card"]} onClick={handlerLink}>
      <div className={styles["wrapper-img"]}>
        <img src={photo} alt="vehicle" className={styles["img-vehicle"]} />
      </div>
      <div className={styles["wrapper-title"]}>
        <span>{vehicleName || "Vechicle Name"}</span>
        <span>{data.location || "Location"}</span>
      </div>
    </div>
  );
}

export default index;
