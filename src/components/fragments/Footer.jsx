import { Link } from 'react-router-dom';
import styles from './fragments.module.scss';

const Footer = () => {



return (
  <footer >
    <div className={styles.footer_wrapper}>
        <div className={styles.text_container_block}>
            <h5>Contact Us</h5>
            <div className={styles.text_flex}>
              <p>hello@chaidom.ru</p>
              <p>Arkhangelsk, Voskresenskaya St. 85</p>
              <p>+7 (999) 123-45-67</p>
            </div>
        </div>

        <div className={styles.dividing_line}></div>

        <div className={styles.logo_block}>
            <Link to="/" className={styles.footer_logo}>
              <img src="/src/assets/img/fragments/logo_white.svg" alt="logo"/>
            </Link>
        </div>

        <div className={styles.dividing_line}></div>

        <div className={styles.text_container_block}>
            <h5>Opening Hours</h5>
            <div className={styles.text_flex}>
              <p>Monday/Friday 10:00-21:00</p>
              <p>Saturday 12:00-20:00</p>
              <p>Closed on Sunday</p>
            </div>
        </div>
    </div>
  </footer>
);
};

export default Footer;
