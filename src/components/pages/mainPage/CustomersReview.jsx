import React, { useEffect, useState } from 'react';
import styles from './mainPage.module.scss';
import { div, p } from 'framer-motion/client';
import { motion, AnimatePresence } from 'framer-motion';


const CustomersReview = () => {
    
    let reviewsArray = [
        {
            name: "Даниил К.",
            pic: "/src/assets/img/mainPage/person_pic_2.png",
            text: "Никогда не пил ничего подобного. Натуральный аромат и мягкий вкус делают каждую чашку настоящим удовольствием."
        },
        {
            name: "Ольга С.",
            pic: "/src/assets/img/mainPage/person_pic_1.svg",
            text: "Этот органический чай просто великолепен! Вкус такой свежий, словно листья только что сорвали и заварили прямо в чашке."
        },
        {
            name: "Елена М.",
            pic: "/src/assets/img/mainPage/person_pic_3.png",
            text: "Чай превзошёл все ожидания! Такое ощущение, что пьёшь напиток, наполненный природой и заботой."
        }
    ];

    const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

    const handleLeftClick = () => {
        setCurrentReviewIndex((prevIndex) =>
          prevIndex === 0 ? reviewsArray.length - 1 : prevIndex - 1
        );
      };
    
      const handleRightClick = () => {
        setCurrentReviewIndex((prevIndex) =>
          prevIndex === reviewsArray.length - 1 ? 0 : prevIndex + 1
        );
      };

      const currentReview = reviewsArray[currentReviewIndex];

      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentReviewIndex((prevIndex) =>
            prevIndex === reviewsArray.length - 1 ? 0 : prevIndex + 1
          );
        }, 8000);
      
        return () => clearInterval(interval);
      }, []);

      
  return (
    <div className={styles.customers_review_wrapper}>
        <img className={styles.left_leaf} src="/src/assets/img/mainPage/review_left_leaf.svg" alt="leaf" />
        <h4 className={styles.customers_review_heading}>Отзывы наших покупателей</h4>

        <div className={styles.carousel_wrapper}>
            <div className={styles.stars_container}>
                <span style={{ fontSize: 23, color: "#8CBC4F" }}>★</span>
                <span style={{ fontSize: 23, color: "#8CBC4F" }}>★</span>
                <span style={{ fontSize: 23, color: "#8CBC4F" }}>★</span>
                <span style={{ fontSize: 23, color: "#8CBC4F" }}>★</span>
                <span style={{ fontSize: 23, color: "#8CBC4F" }}>★</span>
            </div>

            <div className={styles.text_and_arrows_container}>

                <a href='#!' className={styles.arrow_btn} onClick={handleLeftClick}>
                    <span className={styles.arrow} data-direction="left"></span>
                </a>

                <AnimatePresence mode="wait">
                    <motion.p
                        key={currentReview.text}
                        className={styles.text_wrapper}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        “{currentReview.text}”
                    </motion.p>
                </AnimatePresence>


                <a href='#!' className={styles.arrow_btn} onClick={handleRightClick}>
                    <span className={styles.arrow} data-direction="right"></span>
                </a>

            </div>

            <div className={styles.person_wrapper}>
                <div className={styles.person_photo}>
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentReview.pic}
                        src={currentReview.pic}
                        alt="изображение человека"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    />
                </AnimatePresence>
                </div>
                <AnimatePresence mode="wait">
                    <motion.p
                        key={currentReview.text}
                        className={styles.text_wrapper}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        “{currentReview.name}”
                    </motion.p>
                </AnimatePresence>
                <img className={styles.right_leaf} src="/src/assets/img/mainPage/review_right_three_leafes.svg" alt="leaf" />
            </div>

        </div>  
    </div>
  );
};

export default CustomersReview;