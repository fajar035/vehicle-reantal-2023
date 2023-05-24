import React, { useState, forwardRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import { UilAngleLeft } from "@iconscout/react-unicons";
import styles from "./styles.module.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { numberToRupiah } from "../../utils/helpers/currency";
import moment from "moment";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getUserIdApi } from "../../utils/https/user";
import Loading from "../../components/Loading";

function index() {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const token = useSelector((state) => state.auth.userData.token);
  const { state } = location;
  const stock = state.stock;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [newStock, setNewStock] = useState(1);
  const [differenceDays, setDifferenceDays] = useState(0);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getUser = async () => {
    setIsLoading(true);
    try {
      const response = await getUserIdApi(token);
      setUser(response.data.result);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      return Swal.fire({
        title: "Something when wrong ..",
        icon: "error",
        toast: true,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        position: "bottom-right",
      });
    }
  };

  const addStock = () =>
    newStock < parseInt(state.stock) ? setNewStock(newStock + 1) : null;
  const removeStock = () => (newStock > 1 ? setNewStock(newStock - 1) : null);

  const handlerDifferentDays = (startDate, endDate) => {
    const start = moment(startDate);
    const end = moment(endDate);
    const result = end.diff(start, "days");
    return result + 1;
  };

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const Input = forwardRef(({ value, onClick }, ref) => (
    <input
      className={styles["input-date"]}
      type="text"
      onClick={onClick}
      ref={ref}
      defaultValue={value}
      placeholder="Select Date"
    />
  ));

  const handlePayNow = () => {
    if (token.length === 0) {
      Swal.fire({
        title: "You are not logged in, please login first",
        icon: "warning",
        showConfirmButton: true,
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          return navigate("/login");
        }
      });
    }
    if (Object.keys(user).length !== 0) {
      const pay = {
        id_users: user.id,
        id_vehicles: state.id,
        qty: newStock,
        start_date: moment(startDate).format("DD-MM-YYYY"),
        end_date: moment(endDate).format("DD-MM-YYYY"),
        total_price: numberToRupiah(state.price * differenceDays * newStock),
      };

      const checkDataPay = !Object.values(pay).includes("Invalid date");

      if (checkDataPay)
        return navigate("/reservation/payment", {
          state: {
            pay,
            vehicle: { ...state, photo: JSON.parse(state.photo)[0] },
            user,
          },
        });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const betweenDay = handlerDifferentDays(startDate, endDate);
    if (!isNaN(betweenDay)) {
      setDifferenceDays(betweenDay);
    }
  }, [startDate, endDate, differenceDays]);

  return (
    <>
      {pathname !== "/reservation" ? (
        <Outlet />
      ) : (
        <>
          {isLoading ? (
            <Loading />
          ) : (
            <section className={styles.container}>
              <div
                className={styles["link-title"]}
                onClick={() => navigate(-1)}>
                <UilAngleLeft className={`icon ${styles["icon-detail"]}`} />
                <p>Reservation</p>
              </div>
              <div className={styles["wrapper-content"]}>
                <div className={styles["wrapper-img"]}>
                  <div className={styles["wrapper-image-vehicle"]}>
                    <img
                      src={JSON.parse(state.photo)[0]}
                      alt="vehicles"
                      className={styles["image-vehicle"]}
                    />
                  </div>
                </div>
                <div className={styles["wrapper-detail"]}>
                  <p>{state.name}</p>
                  <p>{state.location}</p>
                  <p
                    className={
                      state.status === "Available"
                        ? styles.available
                        : styles.fullBooked
                    }>
                    {state.status}
                  </p>
                  <div className={styles["wrapper-counter"]}>
                    <button type="button" onClick={removeStock}>
                      -
                    </button>
                    <p>{newStock}</p>
                    <button type="button" onClick={addStock}>
                      +
                    </button>
                  </div>
                  <p>Reservation Date : </p>
                  <div className={styles["wrapper-date"]}>
                    <DatePicker
                      selected={startDate}
                      onChange={onChange}
                      startDate={startDate}
                      endDate={endDate}
                      selectsRange
                      isClearable
                      customInput={<Input />}
                      placeholderText="Select Date"
                    />
                  </div>
                </div>
              </div>
              <button className={styles["button-pay"]} onClick={handlePayNow}>
                Pay Now : Rp.{" "}
                {numberToRupiah(state.price * differenceDays * newStock)}
              </button>
            </section>
          )}
        </>
      )}
    </>
  );
}

export default index;
