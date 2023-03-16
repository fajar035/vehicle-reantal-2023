import React, { useState } from "react";
import Footer from "../../components/Footer";
import styles from "./forgot.module.css";
import { UilAngleLeft } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useWindowsDimensions from "../../utils/hooks/useDimensions";
import {
  checkOtpApi,
  getOtpApi,
  resetPasswordApi,
} from "../../utils/https/auth";
import { toast } from "react-toastify";
import { ColorRing } from "react-loader-spinner";
import Swal from "sweetalert2";

function index() {
  const navigate = useNavigate();
  const handlerBack = () => navigate(-1);
  const windowSize = useWindowsDimensions();

  const [email, setemail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState({
    password1: "",
    password2: "",
  });
  const [checkOtp, setCheckOtp] = useState(false);
  const [otpIsValid, setOtpIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlerCreateOtp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const body = {
      email: e.target.email.value,
    };
    setemail(e.target.email.value);
    if (e.target.email.value.length !== 0) {
      getOtpApi(body)
        .then(() => {
          toast.success("Please check your email 😗", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
          setCheckOtp(true);
          setIsLoading(false);
        })
        .catch(() => {
          toast.error("Email is not registered 😑", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
          setCheckOtp(false);
          setIsLoading(false);
        });
    } else {
      toast.warning("Please insert your email", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      setCheckOtp(false);
      setIsLoading(false);
    }
  };

  const handlerCheckOtp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const body = {
      email: e.target.email.value,
      otp: e.target.otp.value,
    };
    setOtp(e.target.otp.value);
    if (e.target.otp.value.length !== 0) {
      checkOtpApi(body)
        .then(() => {
          toast.success("Correct OTP code", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
          setOtpIsValid(true);
          setIsLoading(false);
        })
        .catch(() => {
          toast.error("Wrong OTP code", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
          setOtpIsValid(false);
          setIsLoading(false);
        });
    } else {
      toast.warning("Please insert your OTP code", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      setOtpIsValid(false);
      setIsLoading(false);
    }
  };

  const handlerChangePassword = (e) => {
    e.preventDefault();
    if (e.target.password1.value !== e.target.password2.value)
      return toast.warning("Password is not the same", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });

    const body = {
      email,
      otp,
      password: e.target.password1.value,
    };

    resetPasswordApi(body)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        return Swal.fire({
          title: "Successfully changed the password",
          text: "Please login again",
          showConfirmButton: true,
          icon: "success",
          confirmButtonText: "Ok",
        }).then((props) => {
          if (props.isConfirmed) return navigate("/login");
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        return toast.error("Failed to change password, please do it again", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <>
      <section className={styles.containerForgot}>
        <div className={styles.back} onClick={handlerBack}>
          <UilAngleLeft className={styles.iconForgot} />
          <p>Back</p>
        </div>
        <p className={styles.title}>Don&apos;t worry, we got your back!</p>
        {!checkOtp ? (
          <form className={styles.form} onSubmit={handlerCreateOtp}>
            <input
              type="email"
              placeholder="enter your email address"
              name="email"
            />
            <button type="submit">
              {isLoading ? "Loading " : null}
              {isLoading ? (
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{
                    margin: 0,
                    padding: 0,
                    position: "static",
                    marginLeft: "10px",
                  }}
                  wrapperClass="blocks-wrapper loader"
                  colors={[
                    "#393939",
                    "#393939",
                    "#393939",
                    "#393939",
                    "#393939",
                  ]}
                />
              ) : (
                "Send Link"
              )}
            </button>
          </form>
        ) : checkOtp && otpIsValid ? (
          <form className={styles.form} onSubmit={handlerChangePassword}>
            <input
              type="password"
              placeholder="enter your new password"
              name="password1"
            />
            <input
              type="password"
              placeholder="enter your new password"
              name="password2"
            />
            <button type="submit">
              {isLoading ? "Loading " : null}
              {isLoading ? (
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{
                    margin: 0,
                    padding: 0,
                    position: "static",
                    marginLeft: "10px",
                  }}
                  wrapperClass="blocks-wrapper loader"
                  colors={[
                    "#393939",
                    "#393939",
                    "#393939",
                    "#393939",
                    "#393939",
                  ]}
                />
              ) : (
                "New password"
              )}
            </button>
          </form>
        ) : (
          <form className={styles.form} onSubmit={handlerCheckOtp}>
            <input
              disabled
              type="email"
              placeholder="enter your email address"
              name="email"
              defaultValue={email}
            />
            <input type="number" placeholder="Code OTP" name="otp" />
            <button type="submit">
              {isLoading ? "Loading " : null}
              {isLoading ? (
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{
                    margin: 0,
                    padding: 0,
                    position: "static",
                    marginLeft: "10px",
                  }}
                  wrapperClass="blocks-wrapper loader"
                  colors={[
                    "#393939",
                    "#393939",
                    "#393939",
                    "#393939",
                    "#393939",
                  ]}
                />
              ) : (
                "Check OTP Code"
              )}
            </button>
          </form>
        )}
        <p className={styles.pre}>
          You will receive a link to reset your password. <br />
          If you haven&apos;t received any link, click{" "}
          {windowSize.width < 500 ? <br /> : null} <Link>Resend Link</Link>
        </p>
      </section>
      <Footer />
    </>
  );
}

export default index;
