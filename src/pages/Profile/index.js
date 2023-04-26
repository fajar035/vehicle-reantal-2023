import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import Loading from "../../components/Loading";
import imgProfile from "../../assets/images/user_profile.webp";
import imgPencil from "../../assets/icons/pencil.svg";
import { useSelector } from "react-redux";
import { getUserIdApi } from "../../utils/https/user";

function index() {
  const inputFileRef = useRef(null);
  const token = useSelector((state) => state.auth.userData.token);
  const [isLoading, setIsLoading] = useState(false);
  const [dataUser, setDataUser] = useState({});
  const [photoProfile, setPhotoProfile] = useState(imgProfile);
  const [isGender, setIsGender] = useState(null);

  const fetchUser = useCallback(() => {
    setIsLoading(true);
    getUserIdApi(token)
      .then((res) => {
        setIsLoading(false);
        setDataUser(res.data.result);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [token]);

  const handlerUpload = () => inputFileRef.current.click();

  const getBase64 = (e) => {
    var file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoProfile(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const onFileChange = (e) => {
    const type = e.target.files[0].type;
    if (type.includes("image")) return getBase64(e);
    return alert("Mohon masukan gambar");
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  useEffect(() => {
    if (dataUser) {
      setIsGender(dataUser.gender);
    }
  }, [dataUser]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className={styles["container-profile"]}>
          <p className={styles.title}>Profile</p>
          <div className={styles["wrapper-profile"]}>
            <div className={styles["wrapper-img"]}>
              <img src={photoProfile} alt="profile" className={styles["img"]} />
              <div className={styles["wrapper-pencil"]} onClick={handlerUpload}>
                <img src={imgPencil} alt="pencil" />
              </div>
            </div>

            <p className={styles.name}>{dataUser.name}</p>
            <p className={styles.profile}>{dataUser.email}</p>
            <p className={styles.profile}>+62833467823</p>
            <p className={styles.profile}>Has been active since 2013</p>
            <div className={styles["wrapper-gender"]}>
              <div className={styles.gender} onClick={() => setIsGender("L")}>
                <div className={isGender === "L" ? styles.selected : null} />
                <p>Male</p>
              </div>
              <div className={styles.gender} onClick={() => setIsGender("P")}>
                <div className={isGender === "P" ? styles.selected : null} />
                <p>Female</p>
              </div>
            </div>
            <form
              className={styles["wrapper-contact"]}
              onSubmit={handlerSubmit}>
              <input
                type="file"
                name="image"
                multiple={false}
                ref={inputFileRef}
                onChange={onFileChange}
                hidden
              />
              <h5>Contact</h5>
              <div className={styles["wrapper-input"]}>
                <input type="email" placeholder="Your email" />
                <label>Email address : </label>
              </div>
              <div className={styles["wrapper-input"]}>
                <input type="text" placeholder="Your address" />
                <label>Address : </label>
              </div>
              <div className={styles["wrapper-input"]}>
                <input type="number" placeholder="Your phone number" />
                <label>Phone Number : </label>
              </div>
              <h5 className={styles.identity}>Identity</h5>
              <div className={styles["wrapper-input2"]}>
                <div className={styles["wrapper-input"]}>
                  <input type="text" placeholder="Your Name" />
                  <label>Display Name : </label>
                </div>
                <div className={styles["wrapper-input"]}>
                  <input type="number" placeholder="Your phone number" />
                  <label>DD/MM/YY</label>
                </div>
              </div>
              <div className={styles["wrapper-btn"]}>
                <button className={styles.save} type="submit">
                  Save Change
                </button>
                <button className={styles.edit} type="button">
                  Edit Password
                </button>
                <button className={styles.reset} type="reset">
                  Cansel
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
}

export default index;
