import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";
import Loading from "../../components/Loading";
import imgProfile from "../../assets/images/user_profile.webp";
import imgPencil from "../../assets/icons/pencil.svg";
import { useSelector } from "react-redux";
import {
  getUserIdApi,
  updateUserApi,
  updatePasswordApi,
} from "../../utils/https/user";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const host = process.env.REACT_APP_HOSTDEPLOY;

function index() {
  const inputFileRef = useRef(null);
  const token = useSelector((state) => state.auth.userData.token);
  const [isLoading, setIsLoading] = useState(false);
  const [dataUser, setDataUser] = useState({});
  const [photoProfile, setPhotoProfile] = useState(imgProfile);
  const [isGender, setIsGender] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const fetchUser = useCallback(() => {
    setIsLoading(true);
    getUserIdApi(token)
      .then((res) => {
        const photo = res.data.result.photo;
        setIsLoading(false);
        setDataUser(res.data.result);
        if (photo !== null && photo.length !== 0) {
          setPhotoProfile(host + res.data.result.photo);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        return toast.error("An error occurred, please refresh again", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      });
  }, [token]);

  const goTop = () => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };

  const handlerUpload = async () => {
    const { value: file } = await Swal.fire({
      title: "Select image",
      input: "file",
      showConfirmButton: true,
      confirmButtonText: "Select",
      inputAttributes: {
        accept: "image/*",
        "aria-label": "Upload your profile picture",
      },
    });

    if (file) {
      setSelectedPhoto(file);
      const type = file.type;
      if (type.includes("image")) {
        const reader = new FileReader();
        reader.onload = () => {
          setPhotoProfile(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        Swal.fire({
          icon: "warning",
          title: "Please input the image file",
        });
      }
    }
  };

  const handlerResetPassword = async () => {
    const { value: oldPassword } = await Swal.fire({
      title: "Enter your old password",
      input: "password",
      inputLabel: "Your Password",
      inputPlaceholder: "Enter your password",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return "Please enter your password";
      },
    });

    if (oldPassword) {
      const { value: newPassword } = await Swal.fire({
        title: "Enter your new password",
        input: "password",
        inputLabel: "Your Password",
        inputPlaceholder: "Enter your password",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) return "Please enter your password";
        },
      });

      if (newPassword) {
        const body = {
          oldPassword,
          newPassword,
        };

        updatePasswordApi(body, token)
          .then((res) => {
            return Swal.fire(res.data.message);
          })
          .catch((err) => {
            return Swal.fire(err.response.data.message);
          });
      }
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    const body = new FormData();
    if (selectedPhoto !== null) {
      body.append("photoUser", selectedPhoto, selectedPhoto.name);
    }
    body.append("gender", isGender);
    body.append("email", e.target.email.value);
    body.append("address", e.target.address.value);
    body.append("nohp", e.target.phone.value);
    body.append("name", e.target.name.value);
    body.append("dob", e.target.birthday.value);

    updateUserApi(body, token)
      .then((res) => {
        fetchUser();
        goTop();
        return toast.success("Successful profile update", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      })
      .catch((err) => {
        return toast.error("An error occurred, please try again", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const canselSubmit = () => {
    setPhotoProfile(host + dataUser.photo);
    setIsGender(dataUser.gender);
    goTop();
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
            <p className={styles.profile}>{dataUser.phone}</p>
            <p className={styles.profile}>
              Has been active since {new Date(dataUser.createdAt).getFullYear()}
            </p>
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
                hidden
              />
              <h5>Contact</h5>
              <div className={styles["wrapper-input"]}>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  defaultValue={dataUser.email}
                />
                <label>Email address : </label>
              </div>
              <div className={styles["wrapper-input"]}>
                <input
                  type="text"
                  name="address"
                  placeholder="Your address"
                  defaultValue={dataUser.address}
                />
                <label>Address : </label>
              </div>
              <div className={styles["wrapper-input"]}>
                <input
                  type="number"
                  name="phone"
                  placeholder="Your phone number"
                  defaultValue={dataUser.phone}
                />
                <label>Phone Number : </label>
              </div>
              <h5 className={styles.identity}>Identity</h5>
              <div className={styles["wrapper-input2"]}>
                <div className={styles["wrapper-input"]}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    defaultValue={dataUser.name}
                  />
                  <label>Display Name : </label>
                </div>
                <div className={styles["wrapper-input"]}>
                  <input
                    type="date"
                    name="birthday"
                    placeholder="DD/MM/YYYY"
                    data-date-format="DD MMMM YYYY"
                    defaultValue={dataUser.birtday}
                  />
                  <label>MM/DD/YYYY</label>
                </div>
              </div>
              <div className={styles["wrapper-btn"]}>
                <button className={styles.save} type="submit">
                  Save Change
                </button>
                <button
                  className={styles.edit}
                  type="button"
                  onClick={handlerResetPassword}>
                  Edit Password
                </button>
                <button
                  className={styles.reset}
                  type="reset"
                  onClick={canselSubmit}>
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
