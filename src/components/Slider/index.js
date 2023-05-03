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
      <img src={wordData && wordData} height="300" width="500" />
      <div className={styles.flex_row}>
        <button onClick={() => handlerPrev()} className={styles["btn-handler"]}>
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
                  height="100"
                  width="150"
                />
              </div>
            ))}
        <button onClick={() => handlerNext()} className={styles["btn-handler"]}>
          <UilAngleRight className={`icon ${styles["icon-size"]}`} />
        </button>
      </div>
    </div>
  );
}

export default index;
