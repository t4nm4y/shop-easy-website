import React, { useState, useEffect } from 'react'
import { FiHeart } from 'react-icons/fi';
import { onSnapshot, setDoc, doc, updateDoc, getDoc } from 'firebase/firestore'
import styles from "./ProductCard.module.css";
import { db } from "../firebase";
import { useUserAuth } from "../context/auth";

const Sample = ({ i }) => {

  let name = i.title;
  let prod_id = i.prodct_id;
  let img = i.image;
  let src = i.source;
  let buy_link = i.link;
  let price = i.cost;
  let index = 1;

  const [data, setData] = useState([]);
  const { user } = useUserAuth();

  useEffect(() => {
    const fetchData = onSnapshot(doc(db, "userFavs", user.uid), (doc) => {
      // console.log('doc.data()', doc.data());
      setData(doc.data().bookmarks);
    });
    return () => { fetchData(); };
  }, []);

  const remFav = async (e) => {
    // e.preventDefault()
    try {
      // console.log("the id is: ", prod_id)
      // console.log('before: ', data);
      index = data.findIndex((x) => x.prodct_id === prod_id);
      // console.log(index);
      data.splice(index, 1);
      // console.log('after: ', data);

      if (index != -1) {
        await updateDoc(doc(db, "userFavs", user.uid), {
          bookmarks: data
        });
      }
    } catch (err) {
      console.log(err)
      alert(err)
    }
  }

  return (<>

    <div className={styles.product} id="product_container">
      <img
        className={styles.prodImgIcon}
        alt=""
        id="prod_img"
        src={img} />
      <button className={styles.prodName} id="prod_name">
        <div id="title" >{name}</div>
      </button>
      <div className={styles.linkParent}>
        <a href={buy_link} target="_blank" rel="noreferrer">
          <button className={styles.link} id="prod_link">
            <div id="source">{src}</div>
          </button>
        </a>
        <button className={styles.price} id="prod_price">
          <div className="inr">{price}</div>
        </button>
        <button className={styles.fav_btn} onClick={remFav}>
          <FiHeart className={styles.is_fav} />
        </button>
      </div>
    </div>

  </>
  )
}

export default Sample