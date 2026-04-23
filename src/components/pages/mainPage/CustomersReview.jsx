import React, { useEffect, useState } from 'react';
import styles from './mainPage.module.scss';
import { div, p } from 'framer-motion/client';
import { motion, AnimatePresence } from 'framer-motion';


const CustomersReview = () => {
    
    let reviewsArray = [
        {
            name: "Daniel K.",
            pic: "/src/assets/img/mainPage/person_pic_2.png",
            text: "I have never tasted anything like it. The natural aroma and smooth flavor make every cup a real pleasure."
        },
        {
            name: "Olga S.",
            pic: "/src/assets/img/mainPage/person_pic_1.svg",
            text: "This organic tea is excellent. It tastes so fresh, as if the leaves were picked and brewed right in the cup."
        },
        {
            name: "Elena M.",
            pic: "/src/assets/img/mainPage/person_pic_3.png",
            text: "The tea exceeded every expectation. It feels like drinking something filled with nature and care."
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
        <h4 className={styles.customers_review_heading}>Customer Reviews</h4>

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
                        alt="customer portrait"
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
