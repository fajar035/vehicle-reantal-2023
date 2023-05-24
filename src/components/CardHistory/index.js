import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import moment from "moment";

function index({ isHover, history }) {
  console.log(history);
  const handleDate = (startDate, endDate) => {
    const day1 = moment(startDate).format("D");
    const day2 = moment(endDate).format("D");
    const month = moment(startDate).format("MMM");
    const year = moment(startDate).format("YYYY");
    return `${month} ${day1} - ${day2} ${year}`;
  };
  return (
    <div
      className={`${styles["wrapper-card"]} ${
        isHover ? styles["card-hover"] : ""
      }`}>
      <div className={styles["wrapper-img"]}>
        <div className={styles["wrapper-img"]}>
          <img src={JSON.parse(history.photo)[0]} alt="img-vehicle" />
        </div>
      </div>
      <div className={styles["wrapper-detail"]}>
        <p>{history.vehicle}</p>
        <p>{handleDate(history.booking_date, history.return_date)}</p>
        <p>Prepayment : Rp.250.000</p>
      </div>
    </div>
  );
}

export default index;
