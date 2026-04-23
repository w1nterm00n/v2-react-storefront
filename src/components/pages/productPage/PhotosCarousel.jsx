import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styles from './productPage.module.scss';


const PhotosCarousel = ({ images, onClose }) => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = document.querySelectorAll('.carousel img'); 
    const carouselRef = useRef(null);
    //const [visible, setVisible] = useState(true);

    const updateSlide = () => {
        const slides = carouselRef.current.querySelectorAll('img');
        slides.forEach((img, index) => {
          img.classList.toggle(styles.active, index === currentSlide);
        });
      };
  
    useEffect(() => {
          updateSlide();
      }, []);

    
    function leftSlideChange() {
      setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
      updateSlide();
    }
  
    function rightSlideChange() {
      setCurrentSlide((prev) => (prev + 1) % images.length);
      updateSlide();
    }
  
    function hideOverlay() {
        onClose();
      }
      
  

    return (
            <div className={styles.overlay }>
                    <div className={styles.carousel} ref={carouselRef}>
                        <button className={styles.arrow_left} onClick={leftSlideChange}></button>
                            {images && images.length > 0 ? (
                                images.map((img, index) => (
                                    <img key={index} src={img.url} alt={`product-${index}`}/>
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
  
