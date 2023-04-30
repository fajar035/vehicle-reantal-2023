import React, { useEffect, useState } from "react";
import styles from "./vehicles.module.css";
import { UilSearch, UilAngleRight } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { Outlet, useLocation } from "react-router-dom";
import {
  getVehiclesPopularApi,
  getVehiclesApi,
} from "../../utils/https/vehicle";
import Loading from "../../components/Loading";
import removeDuplicate from "../../utils/helpers/removeDuplicate";

let paramCategory = {
  page: 1,
  limit: 5,
  filterCategory: "",
};

function index() {
  const location = useLocation();
  const { pathname } = location;
  const [vehicleCar, setVehicleCar] = useState([]);
  const [vehicleBike, setVehicleBike] = useState([]);
  const [vehiclePopular, setVehiclePopular] = useState([]);
  const [vehicleMotorBike, setVehicleMotorBike] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getVehicle = async () => {
    setIsLoading(true);
    try {
      const getCars = await getVehiclesApi({
        ...paramCategory,
        filterCategory: "car",
      });
      const getBikes = await getVehiclesApi({
        ...paramCategory,
        filterCategory: "bike",
      });
      const getMotorBike = await getVehiclesApi({
        ...paramCategory,
        filterCategory: "motorbike",
      });
      const getPopulars = await getVehiclesPopularApi();
      // popular di ambil dari user yang memberi rating 5, dan remove yang ber rating 5 sama
      const dataPopular = removeDuplicate(getPopulars?.data.result);
      setVehicleCar(getCars.data.result);
      setVehicleBike(getBikes.data.result);
      setVehicleMotorBike(getMotorBike.data.result);
      setVehiclePopular(dataPopular);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getVehicle();
  }, []);

  return (
    <>
      {pathname !== "/vehicle-type" ? (
        <Outlet />
      ) : (
        <>
          {isLoading ? (
            <Loading />
          ) : (
            <section className={styles["container-vehicle"]}>
              <div className={styles["wrapper-search"]}>
                <input
                  type="text"
                  placeholder="Search vehicle (ex. cars, cars name)"
                />
                <UilSearch
                  className={`${styles["icon-search"]} ${styles.icon}`}
                />
              </div>
              <div className={styles.title}>
                <span>Popular in town</span>
                <Link to="/vehicle-type/popular">
                  View all{" "}
                  <UilAngleRight
                    className={`${styles["icon-view"]} ${styles.icon}`}
                  />
                </Link>
              </div>
              <div className={styles["wrapper-card"]}>
                {vehiclePopular !== 0 &&
                  vehiclePopular.map((popular, idx) => (
                    <Card
                      key={idx}
                      vehicleName={popular.vehicle}
                      city={popular.location}
                      vehicleImage={JSON.parse(popular.photo)}
                    />
                  ))}
              </div>
              <div className={styles.title}>
                <span>Cars</span>
                <Link to="/vehicle-type/cars">
                  View all{" "}
                  <UilAngleRight
                    className={`${styles["icon-view"]} ${styles.icon}`}
                  />
                </Link>
              </div>
              <div className={styles["wrapper-card"]}>
                {vehicleCar !== 0 &&
                  vehicleCar.map((car, idx) => (
                    <Card
                      key={idx}
                      vehicleName={car.name}
                      city={car.location}
                      vehicleImage={JSON.parse(car.photo)}
                    />
                  ))}
              </div>
              <div className={styles.title}>
                <span>Motorbikes</span>
                <Link to="/vehicle-type/motorbikes">
                  View all{" "}
                  <UilAngleRight
                    className={`${styles["icon-view"]} ${styles.icon}`}
                  />
                </Link>
              </div>
              <div className={styles["wrapper-card"]}>
                {vehicleMotorBike !== 0 &&
                  vehicleMotorBike.map((motorBike, idx) => (
                    <Card
                      key={idx}
                      vehicleName={motorBike.name}
                      city={motorBike.location}
                      vehicleImage={JSON.parse(motorBike.photo)}
                    />
                  ))}
              </div>
              <div className={styles.title}>
                <span>Bikes</span>
                <Link to="/vehicle-type/bikes">
                  View all{" "}
                  <UilAngleRight
                    className={`${styles["icon-view"]} ${styles.icon}`}
                  />
                </Link>
              </div>
              <div className={styles["wrapper-card"]}>
                {vehicleBike !== 0 &&
                  vehicleBike.map((bike, idx) => (
                    <Card
                      key={idx}
                      vehicleName={bike.name}
                      city={bike.location}
                      vehicleImage={JSON.parse(bike.photo)}
                    />
                  ))}
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}

export default index;
