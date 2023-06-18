import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";
import Card from "../../components/Card";
import {
  UilAngleRight,
  UilAngleLeft,
  UilTimes,
} from "@iconscout/react-unicons";
import iconStar from "../../assets/icons/vector4.png";
import photoUser from "../../assets/images/comment_users.webp";
import vector2 from "../../assets/icons/vector2.png";
import vector3 from "../../assets/icons/vector3.png";
import {
  getLocationApi,
  getCategoryApi,
  getVehiclesPopularApi,
  getVehiclesApi,
} from "../../utils/https/vehicle";
import removeDuplicate from "../../utils/helpers/removeDuplicate";
import Loading from "../../components/Loading";
import Search from "../../components/Search";

function index() {
  const [location, setLocation] = useState([]);
  const [category, setCategory] = useState([]);
  const [vehiclePopular, setVehiclePopular] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [selectLocation, setSelecetLocation] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [dataSearch, setDataSearch] = useState({});
  const [isSearch, setIsSearch] = useState(false);
  const [isEnter, setIsEnter] = useState(false);

  const searchRef = useRef(null);

  const handleClick = () => {
    searchRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getLocation = async () => {
    setIsLoading(true);
    try {
      const res = await getLocationApi();
      if (res) {
        const { result } = res.data;
        setLocation(result);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategory = async () => {
    setIsLoading(true);
    try {
      const res = await getCategoryApi();
      if (res) {
        const { result } = res.data;
        setCategory(result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getVehiclePopular = useCallback(() => {
    setIsLoading(true);
    getVehiclesPopularApi()
      .then((res) => {
        const popular = res.data.result;
        const dataPopular = removeDuplicate(popular);

        setVehiclePopular(dataPopular);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getLocation();
    getCategory();
    getVehiclePopular();
  }, []);

  useEffect(() => {
    if (searchName.length === 0) {
      setIsEnter(false);
      setIsSearch(false);
      setSelecetLocation("");
    } else {
      setIsSearch(true);
    }
  }, [searchName]);

  const submitSearch = (e) => {
    handleClick();
    e.preventDefault();
    const search = {
      search: e.target.search_vehicle.value,
      filterLocation: e.target.location.value,
      filterCategory: e.target.category.value,
    };
    setDataSearch(search);
    setIsEnter(true);
  };

  const handleIsEnter = () => setIsEnter(false);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className={styles.container}>
          <div className={styles.cover}>
            <h1 className={styles.title}>
              Explore And <br /> Travel
            </h1>
            <p>Vehicle Rental</p>
            <span></span>
            <form className={styles["wrapper-form"]} onSubmit={submitSearch}>
              <div className={styles["wrapper-input"]}>
                <input
                  className={styles["input-search"]}
                  type="text"
                  name="search_vehicle"
                  autoComplete="off"
                  placeholder="Type the vehicle (ex. motorbike"
                  value={searchName}
                  onChange={(e) => setSearchName(e.target.value)}
                />
                <UilTimes
                  onClick={() => setSearchName("")}
                  className={`${styles["link-icon"]} ${
                    searchName.length > 0 ? styles["active-icon"] : ""
                  }`}
                />
              </div>
              <div className={styles["location-date"]}>
                <select
                  name="location"
                  id="location"
                  defaultValue={selectLocation}
                  className={styles["location"]}
                  onChange={(e) => setSelecetLocation(e.target.value)}>
                  <option value={selectLocation} disabled>
                    Choose Location
                  </option>
                  {location.length !== 0 &&
                    location.map((item, idx) => {
                      return (
                        <option value={item.location} key={item.id}>
                          {item.location}
                        </option>
                      );
                    })}
                </select>

                <select
                  name="category"
                  id="category"
                  defaultValue={selectCategory}
                  className={styles["location"]}
                  onChange={(e) => setSelectCategory(e.target.value)}>
                  <option value={selectCategory} disabled>
                    Choose Category
                  </option>
                  {category.length !== 0 &&
                    category.map((item, idx) => {
                      return (
                        <option value={item.category} key={item.id}>
                          {item.category}
                        </option>
                      );
                    })}
                </select>
              </div>
              <button type="submit">Search</button>
            </form>
          </div>

          {isSearch ? (
            <Search
              searchRef={searchRef}
              isSearch={isEnter}
              data={dataSearch}
              handleIsSearch={handleIsEnter}
            />
          ) : (
            <>
              <div className={styles["wrapper-popular"]}>
                <div className={styles["wrapper-title"]}>
                  <p className={styles["title-popular"]}>Popular in town</p>
                  <Link className={styles.link} to="/vehicle-type/popular">
                    View All <UilAngleRight className={styles["link-icon"]} />
                  </Link>
                </div>
                {vehiclePopular.length !== 0 ? (
                  vehiclePopular.map((item, idx) => {
                    const photo = JSON.parse(item.photo);
                    return (
                      <Card
                        key={idx}
                        vehicleName={item.vehicle}
                        vehicleImage={photo}
                        city={item.location}
                        data={item}
                      />
                    );
                  })
                ) : (
                  <>
                    <div className={styles["data_not_found"]}>
                      <p>Data not found</p>
                    </div>
                  </>
                )}
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
                          ”It was the right decision to rent vehicle here, I
                          spent less money and enjoy the trip. It was an amazing
                          experience to have a ride for wildlife trip!”
                        </p>
                      </div>
                      <p>Edward Newgate</p>
                      <p>Founder Circle</p>
                    </div>
                  </div>

                  <div className={styles["wrapper-right"]}>
                    <div className={styles["wrapper-photo"]}>
                      <img
                        src={vector2}
                        alt="icon"
                        className={styles.vector1}
                      />
                      <img
                        src={vector3}
                        alt="icon"
                        className={styles.vector2}
                      />
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
            </>
          )}
        </section>
      )}
    </>
  );
}

export default index;
