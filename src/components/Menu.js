import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";
import { useUserAuth } from "../context/auth";

const Menu = ({ onClose }) => {

  const navigate = useNavigate();
  const { user, logOut } = useUserAuth();
  
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(styles.animate);
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);

  const onLoginClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFrameButtonClick = useCallback(() => {
    navigate("/fav");
  }, [navigate]);

  return (
    <div className={styles.menu} data-animate-on-scroll>
      {/* <button className={styles.about}>About</button> */}
      <button
            className={user ? styles.logout : styles.login}
            id="login_btn"
            onClick={onLoginClick}
          >
            Login
          </button>

          <button
            className={user ? styles.login : styles.logout}
            id="logout_btn"
            onClick={handleLogout}
          >
            Logout
          </button>
      <button
        className={styles.rectangleParent}
        id="fav btn"
        onClick={onFrameButtonClick}
      >
        <div className={styles.frameChild} />
        <button className={styles.heart1} />
      </button>
    </div>
  );
};

export default Menu;
