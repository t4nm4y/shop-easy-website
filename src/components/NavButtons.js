import { useState, useCallback } from "react";
import Menu from "../components/Menu";
import PortalDrawer from "../components/PortalDrawer";
import { useNavigate } from "react-router-dom";
import styles from "./NavButtons.module.css";
import { useUserAuth } from "../context/auth";

const NavButtons = () => {
  const [isFrameOpen, setFrameOpen] = useState(false);
  const { user, logOut } = useUserAuth();
  const navigate = useNavigate();

  const openFrame = useCallback(() => {
    setFrameOpen(true);
  }, []);

  const closeFrame = useCallback(() => {
    setFrameOpen(false);
  }, []);

  const onHeartClick = useCallback(() => {
    navigate("/fav");
  }, [navigate]);


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

  return (
    <>
      <nav className={styles.nav} id="nav">
        <div className={styles.name}>Shop-Easy</div>
        <div className={styles.links} id="rght items container">
          <button className={styles.heart} id="fav" onClick={onHeartClick}>
            <div className={styles.heartChild} />
            <div className={styles.heart1} id="fav_btn" />
          </button>

          {/* <button className={styles.about} id="abt_btn">
            About
          </button> */}

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
        </div>
        <button
          className={styles.hamburgerMenuDark1}
          id="hamburger"
          onClick={openFrame}
        />
      </nav>
      {isFrameOpen && (
        <PortalDrawer placement="Right" onOutsideClick={closeFrame}>
          <Menu onClose={closeFrame} />
        </PortalDrawer>
      )}
    </>
  );
};

export default NavButtons;
