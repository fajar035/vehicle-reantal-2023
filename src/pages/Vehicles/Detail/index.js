import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { UilAngleLeft, UilHeart } from "@iconscout/react-unicons";
import { getVehicleByIdApi } from "../../../utils/https/vehicle";
import Slider from "../../../components/Slider";
import Loading from "../../../components/Loading";
import { numberToRupiah } from "../../../utils/helpers/currency";

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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
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
              {/* available = hijau / full booked = merah */}
              <p
                className={`${styles.status} ${
                  vehicle.status === "full" ? styles.full : styles.available
                }`}>
                {vehicle.status}
              </p>
              <p className={styles.capacity}>
                Capacity : {vehicle.capacity}{" "}
                {vehicle.capacity > 1 ? "persons" : "person"}
              </p>
              <p className={styles.capacity}>Type : {vehicle.category}</p>
              <p className={styles.capacity} style={{ marginBottom: "40px" }}>
                Stock : {vehicle.stock}
              </p>

              <div className={styles["wrapper-qty"]}>
                <p className={styles.price}>{`Rp. ${
                  Object.keys(vehicle).length !== 0
                    ? numberToRupiah(vehicle.price)
                    : ""
                }/day`}</p>
              </div>
            </div>
          </div>

          <div className={styles["wrapper-btn"]}>
            <button>Chat Admin</button>
            <button
              onClick={() => navigate("/reservation", { state: vehicle })}
              type="button">
              Reservation
            </button>
            <button>
              <UilHeart className="icon" /> Like
            </button>
          </div>
        </section>
      )}
    </>
  );
}

export default index;
