import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Card from "../../../components/Card";
import { useLocation } from "react-router-dom";
import {
  getVehiclesPopularApi,
  getVehiclesApi,
} from "../../../utils/https/vehicle";
import Loading from "../../../components/Loading";
import removeDuplicate from "../../../utils/helpers/removeDuplicate";

let paramCategory = {
  page: 1,
  limit: 5,
  filterCategory: "",
};

function index() {
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [vehicleCar, setVehicleCar] = useState([]);
  const [vehicleBike, setVehicleBike] = useState([]);
  const [vehiclePopular, setVehiclePopular] = useState([]);
  const [vehicleMotorBike, setVehicleMotorBike] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getVehicle = async () => {
    setIsLoading(true);

    try {
      switch (title) {
        case "popular": {
          const getPopulars = await getVehiclesPopularApi();
          const dataPopular = removeDuplicate(getPopulars?.data.result);
          setVehiclePopular(dataPopular);
          break;
        }
        case "cars": {
          const getCars = await getVehiclesApi({
            ...paramCategory,
            filterCategory: "car",
          });
          setVehicleCar(getCars.data.result);
          break;
        }
        case "motorbikes": {
          const getMotorBike = await getVehiclesApi({
            ...paramCategory,
            filterCategory: "motorbike",
          });
          setVehicleMotorBike(getMotorBike.data.result);
          break;
        }
        case "bikes": {
          const getBikes = await getVehiclesApi({
            ...paramCategory,
            filterCategory: "bike",
          });
          setVehicleBike(getBikes.data.result);
          break;
        }

        default:
          break;
      }

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getVehicle();
  }, [title]);

  useEffect(() => {
    if (location.pathname.includes("/popular")) return setTitle("popular");
    if (location.pathname.includes("/cars")) return setTitle("cars");
    if (location.pathname.includes("/bikes")) return setTitle("bikes");
    if (location.pathname.includes("/motorbikes"))
      return setTitle("motorbikes");
  }, [location]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className={styles["container-popular"]}>
          <p className={styles.title}>
            {title.length !== 0 && title === "popular"
              ? "Popular in town"
              : title === "cars"
              ? "Cars"
              : title === "motorbikes"
              ? "Motorbikes"
              : "Bikes"}
          </p>
          <div className={styles["wrapper-span"]}>
            <span>Click item to see details and reservation</span>
          </div>
          <div className={styles["wrapper-card"]}>
            {title.length !== 0 && title === "popular"
              ? vehiclePopular.length !== 0 &&
                vehiclePopular.map((item, idx) => (
                  <Card
                    key={idx}
                    vehicleName={item.vehicle}
                    vehicleImage={JSON.parse(item.photo)}
                    data={item}
                  />
                ))
              : title === "cars"
              ? vehicleCar.length !== 0 &&
                vehicleCar.map((item, idx) => (
                  <Card
                    key={idx}
                    vehicleName={item.name}
                    vehicleImage={JSON.parse(item.photo)}
                    data={item}
                  />
                ))
              : title === "motorbikes"
              ? vehicleMotorBike.length !== 0 &&
                vehicleMotorBike.map((item, idx) => (
                  <Card
                    key={idx}
                    vehicleName={item.name}
                    vehicleImage={JSON.parse(item.photo)}
                    data={item}
                  />
                ))
              : vehicleBike.length !== 0 &&
                vehicleBike.map((item, idx) => (
                  <Card
                    key={idx}
                    vehicleName={item.name}
                    vehicleImage={JSON.parse(item.photo)}
                    data={item}
                  />
                ))}
          </div>
          <div className={`${styles["wrapper-span"]} ${styles["span-bottom"]}`}>
            <span>There is no vehicle left</span>
          </div>
        </section>
      )}
    </>
  );
}

export default index;
