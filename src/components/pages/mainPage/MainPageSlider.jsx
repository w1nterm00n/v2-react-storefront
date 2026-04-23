import React, { useEffect, useState } from 'react';
import styles from './mainPage.module.scss';

const MainPageSlider = () => {
  
  let productsArray = [
    {
      name : "Зелёный чай жасмин",
      description: "Насыщенный вкус и аромат жасмина для истинных ценителей зелёного чая.",
      image: "/src/assets/img/mainPage/Banner1img1.png",
    },
    {
      name : "Малиновый красный чай",
      description: "Яркий ягодный вкус и бодрящая энергия малины в каждой чашке.",
      image: "/src/assets/img/mainPage/Banner1img2.png"
    },
    {
      name : "Золотой чай c куркумой",
      description: "Тёплый пряный аромат куркумы с нотками лимона — для уюта и здоровья.",
      image: "/src/assets/img/mainPage/Banner1img3.png"
    }
  ]

  const bgClasses = [styles.green_bg, styles.red_bg, styles.yellow_bg];
  const [index, setIndex] = useState(0);
  const actualProduct = productsArray[index];
  const currentBgClass = bgClasses[index];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % productsArray.length);
      }, 1000);
    }, 60000);
  
    return () => clearInterval(interval);
  }, []);


  return (
    <article className={`${styles.article_wrapper} ${bgClasses[index]}`}>
      <div className={`${styles.banner1}`}>
        <div className={styles.nav_dots_wrapper}>
          <div className={styles.nav_dots}>
            <div className={index == 0 ? styles.circle : styles.dot}></div>
            <div className={index == 1 ? styles.circle : styles.dot}></div>
            <div className={ index == 2 ? styles.circle : styles.dot}></div>
          </div>
        </div>
        <div className={styles.picture_area_wrapper}>
          <div className={styles.picture_area_carousel}>
          <img className={styles.leaf_blur_small} src="/src/assets/img/mainPage/leaf_blur_small.svg" alt="leaf" />
            <img className={styles.leaf_right} src="/src/assets/img/mainPage/leaf_right.svg" alt="leaf" />
            <img className={styles.carousel_img} src={actualProduct.image} alt="banner img" />
            <img className={styles.leaf_blur_biggest} src="/src/assets/img/mainPage/leaf_blur_biggest.svg" alt="leaf" />
          </div>
        </div>
        <div className={styles.description_area}>
          <img className={styles.leaf_left} src="/src/assets/img/mainPage/leaf_left.svg" alt="leaf" />
          <h2> {actualProduct.name} </h2>
          <p> {actualProduct.description} </p>
          <button><a href="/products">СМОТРЕТЬ ТОВАРЫ</a></button>
        </div>
      </div>
    </article>
  );
};

export default MainPageSlider;