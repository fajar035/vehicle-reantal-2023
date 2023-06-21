import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Card from "../../components/Card";
import { getVehiclesApi } from "../../utils/https/vehicle";

function index({ searchRef, isSearch, handleIsSearch, data }) {
  const [vehicles, setVehicles] = useState([]);

  const getSearchVehicle = async (data) => {
    try {
      const res = await getVehiclesApi(data);
      const { result } = res.data;
      setVehicles(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSearch) {
      getSearchVehicle(data);
      if (handleIsSearch) {
        handleIsSearch();
      }
    }
  }, [isSearch]);

  return (
    <section ref={searchRef} className={styles["section-search"]}>
      {vehicles.length !== 0 ? (
        <div className={styles["wrapper-search"]}>
          {vehicles.length !== 0 &&
            vehicles.map((vehicle, idx) => {
              return (
                <>
                  <Card
                    vehicleName={vehicle.name}
                    vehicleImage={JSON.parse(vehicle.photo)}
                    city={vehicle.location}
                    data={vehicle}
                  />
                </>
              );
            })}
        </div>
      ) : (
        <div className={styles["data_not_found"]}>
          <p>Data not found</p>
        </div>
      )}
    </section>
  );
}

export default index;
