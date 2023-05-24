import React, { useEffect, useState } from "react";
import styles from "./history.module.css";
import { UilSearch } from "@iconscout/react-unicons";
import CardHistory from "../../components/CardHistory";
import { getUserIdApi } from "../../utils/https/user";
import { getHistoryApi, deleteHistoryApi } from "../../utils/https/history";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

function index() {
  const token = useSelector((state) => state.auth.userData.token);
  const [history, setHistory] = useState({});
  const [stateSearch, setStateSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("#");
  const handleSetState = (setState) => (e) => setState(e.targer.value);
  // console.log(history);

  const getHistory = async () => {
    setIsLoading(true);
    try {
      const res = await getUserIdApi(token);
      const id_user = res.data.result.id;

      const params = {
        id_user,
        page: 1,
        limit: 5,
        sort: "desc",
        by: "id",
      };

      const resHistory = await getHistoryApi(params, token);
      setHistory(resHistory.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      return Swal.fire({
        title: "Something when wrong ..",
        text: error,
        icon: "error",
        showConfirmButton: true,
        allowOutsideClick: false,
      });
    }
  };

  const deleteHistory = (id, token) => {
    Swal.fire({
      title: "Are you sure you want to delete ?",
      showConfirmButton: true,
      allowOutsideClick: false,
      showDenyButton: true,
      confirmButtonText: "Delete",
      denyButtonText: "Cancel",
    }).then(async ({ isConfirmed }) => {
      if (isConfirmed) {
        await deleteHistoryApi(id, token);
        return getHistory();
      }
    });
  };

  useEffect(() => {
    getHistory();
  }, []);

  // useEffect(() => {
  //   console.log(search);
  // }, [search]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className={styles["container"]}>
          <div className={styles["wrapper-filter-search"]}>
            <div className={styles["wrapper-search"]}>
              <input
                type="text"
                placeholder="Search history"
                onChange={(e) => handleSetState(setStateSearch(e.target.value))}
              />
              <UilSearch
                className={`icon`}
                onClick={() => setSearch(stateSearch)}
              />
            </div>
            <select
              className={styles["dropdown-filter"]}
              defaultValue={filter}
              onChange={(e) => handleSetState(setFilter(e.target.value))}>
              <option value="#" disabled>
                Filter
              </option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="motorbike">Motorbike</option>
            </select>
          </div>
          <span className={styles.line}></span>
          <div className={styles["wrapper-history"]}>
            {Object.keys(history).length !== 0 &&
              history.result.map((item, idx) => (
                <CardHistory
                  key={idx}
                  history={item}
                  id={item.id}
                  token={token}
                  deleteHistory={deleteHistory}
                />
              ))}
          </div>
        </section>
      )}
    </>
  );
}

export default index;
