import React, { useEffect, useState } from 'react';
import styles from './mainPage.module.scss';

const WhyChooseUs = () => {
    
    let whyChooseUsCards = [
        {
            image: "/src/assets/img/mainPage/why_choose_us_1.png",
            heading: "Ручная работа",
            text: "Мы тщательно создаём изысканные чаи, травяные смеси, специи и цветочные композиции вручную, отбирая лучшие ингредиенты со всего мира."
        },
        {
            image: "/src/assets/img/mainPage/why_choose_us_2.png",
            heading: "Свежесть",
            text: "Мы заботимся о свежести каждого чая, чтобы вы могли насладиться настоящим вкусом и ароматом натуральных ингредиентов."
        },
        {
            image: "/src/assets/img/mainPage/why_choose_us_3.png",
            heading: "Экологичность",
            text: "Мы используем только экологически чистое сырьё из устойчивых хозяйств, чтобы каждый ваш чайный глоток был полезен не только вам, но и планете."
        }
    ]    

  return (
    <section className={styles.whyChooseUsWrapper}>
        <div className={styles.whyChooseUs}>
            <div className={styles.WhyChooseUsHeading}>
                <img className={styles.plantImg} src="/src/assets/img/mainPage/why_choose_us_decoration_3.svg" alt="plant image" />
                <img className={styles.planetImg} src="/src/assets/img/mainPage/why_choose_us_decoration_2.svg" alt="planet image" />
                <img className={styles.packageImg} src="/src/assets/img/mainPage/why_choose_us_decoration_1.svg" alt="package image" />
                <img className={styles.logoImage} src="/src/assets/img/fragments/logo.svg" alt="logo" />
                 предлагает лучшие сорта эксклюзивных чаёв, трав, кофе и какао со всего мира.
            </div>

            <div className={styles.WhyChooseUsCards}>
                {whyChooseUsCards.map((card, idx) => (
                    <div className={styles.WhyChooseUsCard} key={idx}>
                        <img src={card.image} alt="why choose us image" />
                        <p className={styles.heading}>{card.heading}</p>
                        <p className={styles.description}>{card.text}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default WhyChooseUs;
