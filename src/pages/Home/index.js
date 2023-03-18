import React from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";
import Card from "../../components/Card";
import { UilAngleRight, UilAngleLeft } from "@iconscout/react-unicons";
import iconStar from "../../assets/icons/vector4.png";
import photoUser from "../../assets/images/comment_users.webp";
import vector2 from "../../assets/icons/vector2.png";
import vector3 from "../../assets/icons/vector3.png";

function index() {
  const submitSearch = (e) => {
    e.preventDefault();
    console.log(e.target.attributes);
  };
  return (
    <>
      <section className={styles.container}>
        <div className={styles.cover}>
          <h1 className={styles.title}>
            Explore And <br /> Travel
          </h1>
          <p>Vehicle Rental</p>
          <span></span>
          <form className={styles["wrapper-form"]} onSubmit={submitSearch}>
            <input
              type="text"
              name="search_vehicle"
              placeholder="Type the vehicle (ex. motorbike"
            />
            <div className={styles["location-date"]}>
              <select name="location" id="location">
                <option value="#" selected disabled>
                  Choose Location
                </option>
                <option value="jakarta">Jakarta</option>
                <option value="depok">Depok</option>
              </select>

              <input type="date" name="date" />
            </div>
            <button type="submit">Search</button>
          </form>
        </div>
        <div className={styles["wrapper-popular"]}>
          <div className={styles["wrapper-title"]}>
            <p className={styles["title-popular"]}>Popular in town</p>
            <Link className={styles.link}>
              View All <UilAngleRight className={styles["link-icon"]} />
            </Link>
          </div>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>

        <div className={styles["wrapper-testimonial"]}>
          <p className={styles["title-testimonial"]}>Testimonials</p>

          <div className={styles["wrapper-content"]}>
            <div className={styles["wrapper-left"]}>
              <div>
                <div className={styles["wrapper-star"]}>
                  <img src={iconStar} alt="icon" />
                  <img src={iconStar} alt="icon" />
                  <img src={iconStar} alt="icon" />
                  <img src={iconStar} alt="icon" />
                  <img src={iconStar} alt="icon" />
                </div>
                <div className={styles["wrapper-comment"]}>
                  <p>
                    ”It was the right decision to rent vehicle here, I spent
                    less money and enjoy the trip. It was an amazing experience
                    to have a ride for wildlife trip!”
                  </p>
                </div>
                <p>Edward Newgate</p>
                <p>Founder Circle</p>
              </div>
            </div>

            <div className={styles["wrapper-right"]}>
              <div className={styles["wrapper-photo"]}>
                <img src={vector2} alt="icon" className={styles.vector1} />
                <img src={vector3} alt="icon" className={styles.vector2} />
                <img src={photoUser} alt="photo-user" />
                <div className={styles["wrapper-btn-arrow"]}>
                  <div className={styles["btn-arrow"]}>
                    <UilAngleLeft className={styles["icon-slider"]} />
                  </div>
                  <div className={styles["btn-arrow"]}>
                    <UilAngleRight className={styles["icon-slider"]} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default index;
