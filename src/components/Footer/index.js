import React from "react";
import styles from "./footer.module.css";
import logo from "../../assets/icons/logo.svg";
import twitter from "../../assets/icons/twitter.svg";
import facebook from "../../assets/icons/facebook-f.svg";
import instagragm from "../../assets/icons/instagram.svg";
import linkedin from "../../assets/icons/linkedin-in.svg";
import youtube from "../../assets/icons/youtube.svg";

function Footer() {
  return (
    <footer>
      <div className={styles["wrapper-footer"]}>
        <div className={styles["wrapper-profile"]}>
          <img src={logo} alt="icon" />
          <p>
            Plan and book your perfect trip with <br /> expert advice, travel
            tips for vehicle <br /> information from us
          </p>
          <p>©2020 Vehicle Rental Center. All rights reserved</p>
        </div>

        <ul>
          <li>Destinations</li>
          <li>Bali</li>
          <li>Yogyakarta</li>
          <li>Jakarta</li>
          <li>Kalimantan</li>
          <li>Malang</li>
        </ul>

        <ul>
          <li>Vehicle</li>
          <li>Bike</li>
          <li>Cars</li>
          <li>Motorbike</li>
          <li>Return Times</li>
          <li>FAQs</li>
        </ul>

        <ul>
          <li>Interests</li>
          <li>Adventure travel</li>
          <li>Art and culture</li>
          <li>Wildlife and future</li>
          <li>Family holidays</li>
          <li>Culinary trip</li>
        </ul>
      </div>

      <hr />

      <div className={styles["wrapper-icon"]}>
        <img className={styles.icon} src={twitter} alt="twitter" />
        <img className={styles.icon} src={facebook} alt="facebook" />
        <img className={styles.icon} src={instagragm} alt="instagram" />
        <img className={styles.icon} src={linkedin} alt="linkedin" />
        <img className={styles.icon} src={youtube} alt="youtube" />
      </div>
    </footer>
  );
}
export default Footer;
