import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './fragments.module.scss';

const Footer = () => {



return (
  <footer >
    <div className={styles.footer_wrapper}>
        <div className={styles.text_container_block}>
            <h5>Связаться с Нами</h5>
            <div className={styles.text_flex}>
              <p>hello@chaidom.ru</p>
              <p>Архангельск, ул. Воскресенская 85</p>
              <p>+7 (999) 123-45-67</p>
            </div>
        </div>

        <div className={styles.dividing_line}></div>

        <div className={styles.logo_block}>
            <a href="/" className={styles.footer_logo}>
              <img src="/src/assets/img/fragments/logo_white.svg" alt="логотип"/>
            </a>
        </div>

        <div className={styles.dividing_line}></div>

        <div className={styles.text_container_block}>
            <h5>Время Работы</h5>
            <div className={styles.text_flex}>
              <p>Понедельник/Пятница 10:00-21:00</p>
              <p>Суббота 12:00-20:00</p>
              <p>В воскресенье закрыто</p>
            </div>
        </div>
    </div>
  </footer>
);
};

export default Footer;
