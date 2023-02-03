import styles from "./ProductCard.module.css";
import { useUserAuth } from "../context/auth";
import React, { useEffect, useState } from 'react';
import { FiHeart } from 'react-icons/fi';
import { db } from '../firebase'
import { setDoc, doc, getDocs, updateDoc, arrayUnion, getDoc } from 'firebase/firestore'

const ProductCard = ({ item }) => {

  // console.log(item)
  const { user } = useUserAuth();
  // const [isClick, setClick] = useState(false);

  return (
    <>
      {
        item.map((i) => {

          const [isFav, changeState] = useState(false);
          let name = i.title;
          let img = i.image;
          let src = i.merchant;
          let buy_link = i.link;
          let price = i.price_raw;
          let prod_id = i.id;

          const addFav = async (e) => {
            if(!user){
              alert("Please login, to add to favourites");
              return;
            }
            changeState(curr => !curr);

            e.preventDefault()
            try {
              //checking if the user has already added it as its fav
              const res = await getDoc(doc(db, "userFavs", user.uid));
              if (!res.exists()) {
                await setDoc(doc(db, "userFavs", user.uid), { bookmarks: [] });
              }
              await updateDoc(doc(db, "userFavs", user.uid), {
                bookmarks: arrayUnion({
                  prodct_id: prod_id,
                  title: name,
                  image: img,
                  source: src,
                  cost: price,
                  link: buy_link
                })
              });

            } catch (err) {
              console.log(err)
              alert(err)
            }

          }
          return (
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
                {/* use this for price icon &#8377; */}
                <button className={styles.price} id="prod_price">
                  <div className="inr">{price}</div>
                </button>
                <button className={styles.fav_btn} onClick={addFav}>
                  <FiHeart className={isFav ? styles.is_fav : styles.is_not_fav} />
                </button>
              </div>
            </div>
          )
        })
      }
    </>
  );

};

export default ProductCard;
