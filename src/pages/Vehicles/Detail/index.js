import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { UilAngleLeft } from "@iconscout/react-unicons";
import { getVehicleByIdApi } from "../../../utils/https/vehicle";
import Slider from "../../../components/Slider";

function index() {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const [vehicle, setVehicle] = useState({});
  const [photoVehicle, setPhotoVehicle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getVechileById = async (id) => {
    setIsLoading(true);
    try {
      const res = await getVehicleByIdApi(id);
      setVehicle(res.data.result[0]);
      setPhotoVehicle(JSON.parse(res.data.result[0].photo));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getVechileById(id);
  }, [id]);

  console.log(vehicle);

  return (
    <section className={styles["container-detail"]}>
      <div className={styles["link-title"]} onClick={() => navigate(-1)}>
        <UilAngleLeft className={`icon ${styles["icon-detail"]}`} />
        <p>Detail</p>
      </div>
      <div className={styles["wrapper"]}>
        <div className={styles["wrapper-slider"]}>
          <Slider dataPhoto={photoVehicle} />
        </div>
        <div className={styles["wrapper-detail"]}>
          <h1 className={styles.title}>{vehicle.name}</h1>
          <p className={styles.location}>{vehicle.location}</p>
          <p>{vehicle.status}</p>
        </div>
      </div>
    </section>
  );
}

export default index;
