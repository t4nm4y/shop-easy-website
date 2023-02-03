import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Fav.module.css";
import { db } from '../firebase'
import { useUserAuth } from "../context/auth";
import { doc, onSnapshot} from 'firebase/firestore'
import Sample from "../components/Sample";

const Fav = () => {
  
  const { user } = useUserAuth();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const go_to_login = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  if (!user) {
    go_to_login();
  }
  const onHomeClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    const fetchData = onSnapshot(doc(db, "userFavs", user.uid), (doc) => {
      // console.log('doc.data()', doc.data());
      setData(doc.data().bookmarks);
    });

    // const fetchData=async()=>{
    //   const dbref=doc(db, "userFavs",  user.uid);
    //   const d = await getDoc(dbref);
    //   console.log('in fetch data',d.data().bookmarks);
    //   setData(d.data().bookmarks);
    // }
    // fetchData();
    return () => { fetchData(); };
  }, []);

  return (
    <>
      <div className={styles.fav}>
        <div className={styles.bg} />
        <img className={styles.favChild} alt="" src="../ellipse-21.svg" />
        <img className={styles.favItem} alt="" src="../ellipse-11.svg" />
        <div className={styles.container} id="prod_cont">

          {data?.map((i) => {
            return <div key={i.name}>
              <Sample i={i} />
            </div>
          })
          }
        </div>
        <button className={styles.home} id="home_btn" onClick={onHomeClick}>
          Home
        </button>
        <label className={styles.favourites}>Favourites</label>
        <img className={styles.heart1Icon} alt="" src="../heart-1@2x.png" />
        <div className={styles.name}>Shop-Easy</div>
      </div>
    </>
  );
};

export default Fav;
