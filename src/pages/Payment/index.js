import React, { useState } from "react";
import styles from "./styles.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { UilAngleLeft } from "@iconscout/react-unicons";
import Swal from "sweetalert2";
import moment from "moment";
import { numberToRupiah } from "../../utils/helpers/currency";
import { addHistoryApi } from "../../utils/https/history";
import { useSelector } from "react-redux";

function index() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.userData.token);
  // console.log(token);
  const { pay, user, vehicle } = location.state;
  const [selectedPayment, setSelectedPayment] = useState("#");
  // console.log("pay : ", pay);
  // console.log("user : ", user);
  // console.log("PAYMENT METHODS : ", selectedPayment);
  // console.log("vehicle : ", vehicle);

  const paymentCode = Math.ceil(Math.random() * 100000000);
  const bookingCode = Math.random()
    .toString(36)
    .replace(/[^a-zA-Z0-9]+/g, "")
    .slice(0, 8)
    .toUpperCase();

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    const Toast = Swal.mixin({
      position: "bottom-right",
      toast: true,
      timerProgressBar: true,
      showConfirmButton: false,
      timer: 2000,
    });
    return Toast.fire({
      title: "Code copied to clipboard",
      icon: "success",
    });
  };

  const handleSetState = (setState) => (e) => setState(e.target.value);

  const handleReservationDate = (startDate, endDate) => {
    const day1 = moment(startDate).format("D");
    const day2 = moment(endDate).format("D");
    const month = moment(startDate).format("MMM");
    const year = moment(startDate).format("YYYY");
    return `${month} ${day1} - ${day2} ${year}`;
  };

  const handlePayment = async () => {
    if (selectedPayment === "#")
      return Swal.fire({
        title: "Please select your payment",
        icon: "warning",
        showConfirmButton: true,
        allowOutsideClick: false,
      });
    try {
      const body = {
        id_users: user.id,
        id_vehicles: vehicle.id,
        qty: pay.qty,
        start_date: pay.start_date,
        return_date: pay.end_date,
        total_price: pay.total_price,
      };
      await addHistoryApi(body, token);

      Swal.fire({
        title: "Finish Payment",
        text: `Payment using ${selectedPayment}`,
        icon: "success",
        showConfirmButton: true,
        allowOutsideClick: false,
      }).then(({ isConfirmed }) => {
        return navigate("/history");
      });
    } catch (error) {
      return Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        showConfirmButton: true,
        allowOutsideClick: false,
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          return navigate(-1);
        }
      });
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles["link-title"]} onClick={() => navigate(-1)}>
        <UilAngleLeft className={`icon ${styles["icon-detail"]}`} />
        <p>Payment</p>
      </div>
      <div className={styles["wrapper-content"]}>
        <div className={styles.area1}>
          <div className={styles["wrapper-img"]}>
            <img
              src={vehicle.photo}
              alt="vehicle"
              className={styles["img-vehicle"]}
            />
          </div>
        </div>
        <div className={styles.area2}>
          <p className={styles.vehicle_name}>{vehicle.name}</p>
          <p className={styles.vehicle_location}>{vehicle.location}</p>
          <p className={styles.vehicle_status}>{vehicle.status}</p>
          <p className={styles.booking_code}>
            <span># </span>
            {bookingCode}
          </p>
          <button
            type="button"
            className={styles.btn_booking_code}
            onClick={() => copyCode(bookingCode)}>
            Copy booking code
          </button>
        </div>
        <div className={styles.area3}>
          <p>{`Quantity : ${pay.qty} ${
            pay.qty > 1 ? "Vehicles" : "Vehicle"
          }`}</p>
        </div>
        <div className={styles.area4}>
          <p>{`Reservation Date : ${handleReservationDate(
            pay.startDate,
            pay.endDate
          )}`}</p>
        </div>
        <div className={styles.area5}>
          <p>Order Detail : </p>
          <p>{`${pay.qty} ${vehicle.category} : Rp.${numberToRupiah(
            vehicle.price
          )}`}</p>
          <p>{`Total : Rp.${pay.total_price}`}</p>
        </div>
        <div className={styles.area6}>
          <p>Identity : </p>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
        <div className={styles.area7}>
          <p>Payment Code : </p>
          <p className={styles["payment-code"]}>
            # {paymentCode}{" "}
            <span onClick={() => copyCode(paymentCode)}>Copy</span>
          </p>
          <select
            className={styles["dropdown-payment"]}
            defaultValue={selectedPayment}
            onChange={(e) =>
              handleSetState(setSelectedPayment(e.target.value))
            }>
            <option value="#" disabled>
              Select payment methods
            </option>
            <option value="cash">Cash</option>
            <option value="transfer">Transfer</option>
          </select>
        </div>
        <button
          type="button"
          className={styles.btn_payment}
          onClick={handlePayment}>
          Finish payment
        </button>
      </div>
    </section>
  );
}

export default index;
