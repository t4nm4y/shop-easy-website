import ProductCard from "../components/ProductCard";
import NavButtons from "../components/NavButtons";
import styles from "./Home.module.css";
import { PulseLoader } from 'react-spinners'
import axios from "axios";
import react, { useEffect, useState } from "react";

const Home = () => {

  const [query, searchPost] = useState("");
  const [isLoaded, setLoaded] = useState(true);
  const [prodData, setData] = useState([]);

  function fetchData() {
    // console.log("pressed");
    setLoaded(curr => !curr);
    // cors();
    let q = query.replace(/ /g, "+");
    let key = process.env.REACT_APP_SERP_API_KEY;
    // let key="demo";
    // console.log(q);
    // console.log(isLoaded)
    axios.get(
      'https://api.scaleserp.com/search?api_key=' + key + '&search_type=shopping&q=' + q + '&location=Noida%2CUttar+Pradesh%2CIndia&google_domain=google.co.in&gl=in&hl=hi&num=30'
    )
      .then(
        res => {
          setData(res.data.shopping_results);
          setLoaded(curr => !curr)
        }
      )
      .catch(err => console.log(err));

  };

  const searchProd = (evt) => {

    if (evt.key === "Enter") {
      fetchData();
    }
  };
  return (

    <div className={styles.home}>
      <div className={styles.bg} />
      <img className={styles.homeChild} alt="" src="../ellipse-2.svg" />
      <img className={styles.homeItem} alt="" src="../ellipse-1.svg" />
      <div className={styles.loader}>
        <PulseLoader
          loading={!isLoaded}
          styles={{ marginTop: 200 }}
          color={"#ACBBBF"}
          size={8}
        />
      </div>
      <div className={styles.container} id="prod_cont">
        {
          <ProductCard item={prodData} />
        }
      </div>
      <div className={styles.searchBar} id="search bar">
        <input className={styles.searchArea} type="text" placeholder="Search" id="search_bar"
          onChange={(e) => searchPost(e.target.value)}
          onKeyPress={searchProd}
        />
        <button className={styles.searchIcon} id="search_btn"
          onClick={fetchData}
        />
      </div>
      <NavButtons />
    </div>
  );
};

export default Home;
