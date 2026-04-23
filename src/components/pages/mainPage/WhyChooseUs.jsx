import React, { useEffect, useState } from 'react';
import styles from './mainPage.module.scss';

const WhyChooseUs = () => {
    
    let whyChooseUsCards = [
        {
            image: "/src/assets/img/mainPage/why_choose_us_1.png",
            heading: "Handcrafted",
            text: "We carefully craft refined teas, herbal blends, spices, and floral compositions by hand, selecting the best ingredients from around the world."
        },
        {
            image: "/src/assets/img/mainPage/why_choose_us_2.png",
            heading: "Freshness",
            text: "We protect the freshness of every tea so you can enjoy the true flavor and aroma of natural ingredients."
        },
        {
            image: "/src/assets/img/mainPage/why_choose_us_3.png",
            heading: "Sustainability",
            text: "We use eco-conscious ingredients from responsible farms, making every sip better for you and the planet."
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
                 offers the finest exclusive teas, herbs, coffee, and cacao from around the world.
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
