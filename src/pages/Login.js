import { useCallback } from "react";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const signUp = () => {
  const navigate = useNavigate();

  const onHomeClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className={styles.login}>
      <div className={styles.bg} />
      <img className={styles.loginChild} alt="" src="../ellipse-22.svg" />
      <img className={styles.loginItem} alt="" src="../ellipse-12.svg" />
      <LoginForm />
      <div className={styles.name}>Shop-Easy</div>
      <button className={styles.home} id="home_btn" onClick={onHomeClick}>
        Home
      </button>
    </div>
  );
};

export default signUp;
