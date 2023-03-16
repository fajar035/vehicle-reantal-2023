import React, { useEffect, useState } from "react";
import styles from "./register.module.css";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import iconGoogle from "../../assets/icons/icon_google.png";
import iconCars from "../../assets/icons/icon-cars.webp";
import { registerApi } from "../../utils/https/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Register() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    name: false,
    email: false,
    password: false,
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    try {
      e.preventDefault();
      if (
        state.name.length === 0 ||
        state.email.length === 0 ||
        state.password.length === 0
      ) {
        setError({ name: true, email: true, password: true });
      }
      const body = state;
      const result = await registerApi(body);
      const { message } = result.data;
      Swal.fire({
        title: message,
        icon: "success",
        confirmButtonText: "ok",
        confirmButtonColor: "#ffcd61",
      }).then((res) => {
        const { isConfirmed } = res;
        if (isConfirmed) return navigate("/login");
      });
      return setError({ name: false, email: false, password: false });
    } catch (err) {
      Swal.fire("Error", "You clicked the button!", "error");
      console.log(err);
    }
  };

  useEffect(() => {
    if (error.name || error.email || error.password)
      return alert("please insert data ..");
  }, [error.name, error.email, error.password]);

  return (
    <>
      <section className={styles["wrapper-login"]}>
        <div className={styles.left}>
          <p>
            let&apos;s Explorer <br /> The World
          </p>
          <p>Already have an account ?</p>
          <button>
            <Link to="/login">Login</Link>
          </button>
        </div>

        <div className={styles["pole"]}>
          <div className={styles["round1"]}></div>
          <div className={styles["round2"]}></div>
        </div>

        <div className={styles.right}>
          <p>Sign Up</p>
          <h1>
            Vehicle rental <img src={iconCars} alt="icon" width={50} />
          </h1>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setState({ ...state, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setState({ ...state, password: e.target.value })}
            />
            <button type="submit">Sign Up</button>
          </form>

          <button>
            <img src={iconGoogle} alt="icon" width={16} />
            Sign up with Google
          </button>
          <button className={styles["btn-register-mobile"]}>
            <Link to="/login">Login</Link>
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Register;
