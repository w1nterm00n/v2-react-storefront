import { Link } from 'react-router-dom';
import styles from './mainPage.module.scss';
import CollectionFilterPanel from './CollectionFilterPanel';


const FeaturedProducts = () => {
    
  return (
    <section className={styles.featured_products_wrapper}>
        <div className={styles.featured_products}>
            <p>Try our tea</p>
            <h3>Popular Products</h3>
            <CollectionFilterPanel></CollectionFilterPanel>
            <div className={styles.link}>
                <Link to="/products">GO TO CATALOG</Link>
                <img src="/src/assets/img/mainPage/link_decoration.svg" alt="arrow" />
            </div>
        </div>
    </section>
  );
};

export default FeaturedProducts;
