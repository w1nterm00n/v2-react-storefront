import React, { useEffect, useState } from "react";
import Pagination from "../../fragments/Pagination";
import Footer from "../../fragments/Footer";
import Navbar from "../../fragments/Navbar";
import styles from "./contactPage.module.scss"

const ContactPage = () => {

  return (
    <>
    <Navbar></Navbar>
    <div>
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1714.8626582181264!2d40.54060387762475!3d64.54451548322612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4418369da91e64f7%3A0x819c73fed76dfe78!2z0JLQvtGB0LrRgNC10YHQtdC90YHQutCw0Y8g0YPQuy4sIDg1LCDQkNGA0YXQsNC90LPQtdC70YzRgdC6LCDQkNGA0YXQsNC90LPQtdC70YzRgdC60LDRjyDQvtCx0LsuLCAxNjMwNDY!5e0!3m2!1sru!2sru!4v1748625110247!5m2!1sru!2sru"
            width={"100%"}
            height={450}
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        />
    </div>

    <div className={styles.gallery_wrapper}>
        <h4 className={styles.gallery_title}>Tea in Detail</h4>
        <div className={styles.gallery_grid_container}>
            <div className={`${styles.grid_child} ${styles.child1}`}>
                <img src="/src/assets/img/contactsPage/Img1.jpg" alt="aestatic tea image" />
            </div>
            <div className={`${styles.grid_child} ${styles.child2}`}>
                <img src="/src/assets/img/contactsPage/Vector.svg" alt="instagram logo" />
                <p>@teapoz</p>
            </div>
            <div className={`${styles.grid_child} ${styles.child3}`}>
                <img src="/src/assets/img/contactsPage/Img2.jpg" alt="aestatic tea image" />
            </div>
            <div className={`${styles.grid_child} ${styles.child4}`}>
            <img src="/src/assets/img/contactsPage/Img3.jpg" alt="aestatic tea image" />
            </div>
            <div className={`${styles.grid_child} ${styles.child5}`}>
            <img src="/src/assets/img/contactsPage/Img4.jpg" alt="aestatic tea image" />
            </div>
            <div className={`${styles.grid_child} ${styles.child6}`}>
            <img src="/src/assets/img/contactsPage/Img5.jpg" alt="aestatic tea image" />
            </div>
        </div>
    </div>

    <div className={styles.feedback_form_wrapper}>
        <img className={styles.leafs_img} src="/src/assets/img/contactsPage/leafs.svg" alt="leafs image" />
        <h4 className={styles.feedback_title}>Stay in Touch</h4>
        <p className={styles.feedback_text}>Subscribe to our newsletter and stay updated on new arrivals. We will share fresh releases and special offers.</p>
        <div className={styles.feedback_form}>
            <form style={{ maxWidth: 700 }}>
                <input
                type="email"
                className="form-control border-0"
                placeholder="Your email"
                aria-label="Email"
                required=""
                />
                <button
                style={{ backgroundColor: "#13472D" }}
                type="submit"
                >
                SUBSCRIBE
                </button>
            </form>
        </div>
        <img className={styles.cup_img} src="/src/assets/img/contactsPage/cup.svg" alt="cup image" />
    </div>

    <Footer></Footer>
    </>
  );
};

export default ContactPage;
