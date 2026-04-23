import { useState } from 'react';
import styles from './productPage.module.scss';


const PhotosCarousel = ({ images, onClose }) => {

    const [currentSlide, setCurrentSlide] = useState(0);

    
    function leftSlideChange() {
      if (!images?.length) return;
      setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    }
  
    function rightSlideChange() {
      if (!images?.length) return;
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }
  
    function hideOverlay() {
        onClose();
      }
      
  

    return (
            <div className={styles.overlay }>
                    <div className={styles.carousel}>
                        <button className={styles.arrow_left} onClick={leftSlideChange}></button>
                            {images && images.length > 0 ? (
                                images.map((img, index) => (
                                    <img
                                      key={index}
                                      src={img.url}
                                      alt={`product-${index}`}
                                      className={index === currentSlide ? styles.active : ""}
                                    />
                                ))
                            ) : (
                                <p>No images</p>
                            )}
                        <button className={styles.arrow_right} onClick={rightSlideChange}></button>
                    
                        <button className={styles.close_btn} onClick={hideOverlay}>
                        </button>
                    
                    </div>
            </div>
    );
  };
  
  export default PhotosCarousel;
  
