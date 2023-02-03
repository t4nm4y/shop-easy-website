import styles from "./LoginForm.module.css";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/auth";
import { db } from "../firebase";
import { setDoc, doc } from 'firebase/firestore'

const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [error, setError] = useState("");

  const { logIn, googleSignIn } = useUserAuth();

  const handleSubmit = async (e) => {
    // so that the page doesn't get refresh on submit
    e.preventDefault();
    setError("");
    try {
      await logIn(email, pswd);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await googleSignIn();

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
      });

      navigate("/");

    } catch (error) {
      console.log(error.message);
    }
  };

  const navigate = useNavigate();
  const clickHandler = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  return (
    <form className={styles.foreground}
      onSubmit={handleSubmit}>
      <input
        className={styles.userid}
        type="email"
        placeholder="Email Address"
        id="email_id"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={styles.pswd}
        type="password"
        placeholder="Password"
        id="pswd"
        onChange={(e) => setPswd(e.target.value)}
      />
      <button className={styles.signupWrapper} id="login_btn">
        <div className={styles.btnTxt}>Login</div>
      </button>
      <div className={styles.or}>OR</div>
      <button className={styles.google} id="google_btn" onClick={handleGoogleSignIn}>
        <img className={styles.gIcon} alt="" src="../g-icon@2x.png" />
        <div className={styles.continueWithGoogle}>Continue with Google</div>
      </button>
      <div className={styles.alreadyUsr}>New user?</div>
      <button className={styles.loginWrapper} id="login_btn" onClick={clickHandler}>
        <div className={styles.btnTxt}>SignUp</div>
      </button>
      {error && <div className={styles.error} variant="danger">{error}</div>}
    </form>
  );
};

export default LoginForm;
