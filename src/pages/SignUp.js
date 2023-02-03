import { useCallback } from "react";
import SignupForm from "../components/SignupForm";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const navigate = useNavigate();
  const onHomeClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={styles.login}>
      <div className={styles.bg} />
      <img className={styles.loginChild} alt="" src="../ellipse-22.svg" />
      <img className={styles.loginItem} alt="" src="../ellipse-12.svg" />
      <SignupForm />
      <div className={styles.name}>Shop-Easy</div>
      <button className={styles.home} id="home_btn" onClick={onHomeClick}>
        Home
      </button>
    </div>
  );
};

export default SignUp;
