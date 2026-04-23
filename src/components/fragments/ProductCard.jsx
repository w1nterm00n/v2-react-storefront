import { Link } from 'react-router-dom';
import styles from './fragments.module.scss';
import ProductPrice from './ProductPrice';
import { REGION_ID } from '../../constants';

const ProductCard = (product) => {

  return (

      <div className={styles.product_card_wrapper} style={{ width: "18rem" }}>
        <div className={styles.product_card}>
            <div className={styles.card_body}>
                <img src={product.product.thumbnail} alt="test picture" />
                <h5 className={styles.card_title}>{product.product.title}</h5>
                <ProductPrice productId={product.product.id} regionId={REGION_ID}></ProductPrice>
                <Link to={`/products/${product.product.id}`} className={styles.btn_default}>
                    VIEW PRODUCT
                </Link>
            </div>
        </div>
      </div>

  );
};

export default ProductCard;
