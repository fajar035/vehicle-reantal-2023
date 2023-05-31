import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import moment from "moment";
import Swal from "sweetalert2";
import { updateRatingHistoryApi } from "../../utils/https/history";
import { UilStar } from "@iconscout/react-unicons";

function index({ history, id, deleteHistory, token, handleRating }) {
  const [isHover, setIsHover] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleDate = (startDate, endDate) => {
    const day1 = moment(startDate).format("D");
    const day2 = moment(endDate).format("D");
    const month = moment(startDate).format("MMM");
    const year = moment(startDate).format("YYYY");
    return `${month} ${day1} - ${day2} ${year}`;
  };

  const submitRating = () => {
    return Swal.fire({
      title: "Give Rating",
      input: "select",
      inputPlaceholder: "Select a rating",
      inputOptions: {
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
      },
      allowOutsideClick: false,
      showCancelButton: true,
    }).then((result) => {
      const { value } = result;
      handleRating(value);
      const body = {
        rating: value,
      };

      return updateRatingHistoryApi(id, body, token)
        .then((res) => {
          const Toast = Swal.mixin({
            toast: true,
            position: "bottom",
            timer: 5000,
            showConfirmButton: false,
            timerProgressBar: true,
          });
          return Toast.fire({
            title: "Successfully provide a rating, Thanks you ...",
            icon: "success",
          });
        })
        .catch((err) => {
          console.log(err);
          return Swal.fire({
            title: "Something when wrong ...",
            icon: "error",
            showConfirmButton: true,
            allowOutsideClick: false,
          });
        });
    });
  };

  const renderStar = (rating) => {
    let arr = [];
    for (let i = 1; i <= rating; i++) {
      arr.push(i);
    }

    return (
      <>
        {rating !== null &&
          arr.length !== 0 &&
          arr.map((item) => (
            <UilStar key={item} className={`icon ${styles.customIcon}`} />
          ))}
      </>
    );
  };

  return (
    <>
      <div
        className={`${styles["container-card"]}`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}>
        <div
          className={`${styles["wrapper-card"]} ${
            isHover && width >= 768
              ? styles["card-hover"]
              : isHover && width < 550
              ? styles["card-hover2"]
              : ""
          }`}>
          <div className={styles["wrapper-img"]}>
            <div className={styles["wrapper-img"]}>
              <img src={JSON.parse(history.photo)[0]} alt="img-vehicle" />
            </div>
          </div>
          <div className={styles["wrapper-detail"]}>
            <p className={styles.title}>{history.vehicle}</p>
            <p className={styles.date}>
              {handleDate(history.booking_date, history.return_date)}
            </p>
            <p
              className={
                styles.price
              }>{`Prepayment : Rp.${history.total_price}`}</p>
            <p className={styles.qty}>{`Qty : ${history.qty}`}</p>
            <p>Rating : {renderStar(history.rating)}</p>
          </div>
        </div>
        <button
          type="button"
          className={`${styles["btn-rating"]} ${
            isHover ? styles["btn-hover"] : ""
          }`}
          onClick={submitRating}>
          Rating
        </button>
        <button
          type="button"
          className={`${styles["btn-delete"]} ${
            isHover ? styles["btn-hover"] : ""
          }`}
          onClick={() => deleteHistory(id, token)}>
          Delete
        </button>
      </div>
    </>
  );
}

export default index;
