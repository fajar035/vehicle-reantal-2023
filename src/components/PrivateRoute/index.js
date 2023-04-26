import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";

const index = () => {
  const navigate = useNavigate();
  useEffect(() => {
    Swal.fire({
      title: "You must login ..",
      showConfirmButton: true,
      icon: "info",
      confirmButtonText: "Ok",
      allowOutsideClick: false,
    }).then((props) => {
      if (props.isConfirmed) return navigate("/");
    });
  }, []);

  return (
    <section
      style={{ width: "100hv", height: "100vh", backgroundColor: "white" }}
    />
  );
};

export default index;
