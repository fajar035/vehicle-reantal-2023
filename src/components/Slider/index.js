import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { UilAngleLeft, UilAngleRight } from "@iconscout/react-unicons";

function index({ dataPhoto }) {
  const [wordData, setWordData] = useState("");
  const index = dataPhoto.indexOf(wordData);

  useEffect(() => {
    setWordData(dataPhoto[0]);
  }, [dataPhoto]);

  const handlerPrev = () => {
    if (index > 0) {
      setWordData(dataPhoto[index - 1]);
    }
  };

  const handlerNext = () => {
    if (index < 2) {
      setWordData(dataPhoto[index + 1]);
    }
  };

  return (
    <div className={styles.main}>
      <img src={wordData && wordData} />
      <div className={styles.flex_row}>
        <button
          onClick={() => handlerPrev()}
          className={`${styles["btn-handler"]} ${
            index === 0 ? styles.disable : ""
          }`}>
          <UilAngleLeft className={`icon ${styles["icon-size"]}`} />
        </button>
        {dataPhoto &&
          dataPhoto
            .filter((item) => item !== wordData)
            .map((data, i) => (
              <div className={styles.thumbnail} key={i}>
                <img
                  className={dataPhoto[i] == i ? styles.clicked : ""}
                  src={data}
                />
              </div>
            ))}
        <button
          onClick={() => handlerNext()}
          className={`${styles["btn-handler"]} ${
            index === 2 ? styles.disable : ""
          }`}>
          <UilAngleRight className={`icon ${styles["icon-size"]}`} />
        </button>
      </div>
    </div>
  );
}

export default index;
