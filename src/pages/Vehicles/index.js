import React from "react";
import styles from "./vehicles.module.css";
import { UilSearch, UilAngleRight } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { Outlet, useLocation } from "react-router-dom";

function index() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <>
      {pathname !== "/vehicle-type" ? (
        <Outlet />
      ) : (
        <section className={styles["container-vehicle"]}>
          <div className={styles["wrapper-search"]}>
            <input
              type="text"
              placeholder="Search vehicle (ex. cars, cars name)"
            />
            <UilSearch className={`${styles["icon-search"]} ${styles.icon}`} />
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
            <Card />
            <Card />
            <Card />
            <Card />
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
            <Card />
            <Card />
            <Card />
            <Card />
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
            <Card />
            <Card />
            <Card />
            <Card />
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
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </section>
      )}
    </>
  );
}

export default index;
