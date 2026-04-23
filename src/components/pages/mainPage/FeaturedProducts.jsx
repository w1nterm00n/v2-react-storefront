import React, { useEffect, useState } from 'react';
import MainPageSlider from './MainPageSlider';
import styles from './mainPage.module.scss';
import ProductCard from '../../fragments/ProductCard';
import CollectionFilterPanel from './CollectionFilterPanel';


const FeaturedProducts = () => {
    
  return (
    <section className={styles.featured_products_wrapper}>
        <div className={styles.featured_products}>
            <p>Try our tea</p>
            <h3>Popular Products</h3>
            <CollectionFilterPanel></CollectionFilterPanel>
            <div className={styles.link}>
                <a href="/products">GO TO CATALOG</a>
                <img src="/src/assets/img/mainPage/link_decoration.svg" alt="arrow" />
            </div>
        </div>
    </section>
  );
};

export default FeaturedProducts;
