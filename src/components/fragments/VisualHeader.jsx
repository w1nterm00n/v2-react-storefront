import React, { useEffect, useState } from "react";
import styles from './fragments.module.scss';


const VisualHeader = ({text}) => {

  return (
    <div className={styles.visual_header_wrapper}>
        <div className={styles.image_wrapper}>
            <img src="/src/assets/img/fragments/bg_image.jpg" alt="aestatic image" className={styles.visual_header_image}/>
            <p className={styles.visual_header_inscription}>{text}</p>
        </div>
    </div>
  );
};

export default VisualHeader;
