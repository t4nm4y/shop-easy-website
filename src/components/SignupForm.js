import styles from "./SignupForm.module.css";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/auth";
import { db } from "../firebase";
import { setDoc, doc } from 'firebase/firestore'

const SignupForm = () => {

  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useUserAuth();
  const handleSubmit = async (e) => {
    // so that the page doesn't get refresh on submit
    e.preventDefault();
    setError("");
    try {
      const res = await signUp(email, pswd);

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const navigate = useNavigate();
  const clickHandler = useCallback(() => {
    navigate("/login");
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
      <button className={styles.signupWrapper} id="login_btn" type="submit">
        <div className={styles.btnTxt}>Sign Up</div>
      </button>
      <div className={styles.alreadyUsr}>Already a user?</div>
      <button className={styles.loginWrapper} id="login_btn" onClick={clickHandler}>
        <div className={styles.btnTxt}>Login</div>
      </button>

      {error && <div className={styles.error} variant="danger">{error}</div>}
    </form>

  );
};

export default SignupForm;
