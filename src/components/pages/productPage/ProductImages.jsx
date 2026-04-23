import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './productPage.module.scss';
import PhotosCarousel from './PhotosCarousel';


const ProductImages = ({ images }) => {
    const imageCount = images?.length || 0;
    const containerClass = `${styles.product_images_container} ${
        imageCount > 1 && imageCount <= 4
        ? styles[`product_images_container${imageCount}`]
        : ""
    }`;
  const [visibleCarousel, setVisibleCarousel] = useState(false);


  function showOverlay() {
    setVisibleCarousel(true);
  }

    return (
      <div className={styles.product_images_wrapper}>
        <div className={containerClass}>

        {images && images.length > 0 ? (
          images.map((img, index) => (

            <div key={index} className={styles.image_item}>
              <button onClick={showOverlay}>
                <img src={img.url} alt={`product-${index}`}/>
              </button>
            </div>

          ))
        ) : (
          <p>No images</p>
        )}

        </div>
        {visibleCarousel && (
          <PhotosCarousel images={images} onClose={() => setVisibleCarousel(false)}></PhotosCarousel>
        )}
      </div>
    );
  };
  
  export default ProductImages;
  
