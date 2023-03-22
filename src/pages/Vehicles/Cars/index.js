import React from "react";
import styles from "./styles.module.css";
import Card from "../../../components/Card";

function index() {
  return (
    <section className={styles["container-cars"]}>
      <p className={styles.title}>Cars</p>
      <div className={styles["wrapper-span"]}>
        <span>Click item to see details and reservation</span>
      </div>
      <div className={styles["wrapper-card"]}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className={`${styles["wrapper-span"]} ${styles["span-bottom"]}`}>
        <span>There is no vehicle left</span>
      </div>
    </section>
  );
}

export default index;
