import React from "react";
import styles from "./styles.module.css";
import { useParams } from "react-router-dom";

function index() {
  const params = useParams();
  const { id } = params;

  return <div className={styles["container-detail"]}>Page detail</div>;
}

export default index;
