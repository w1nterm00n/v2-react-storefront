import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../fragments/Footer';
import ProductPrice from '../../fragments/ProductPrice';
import Navbar from '../../fragments/Navbar';
import VisualHeader from '../../fragments/VisualHeader';
import styles from './productPage.module.scss';
import ProductImages from './ProductImages';
import RecommendedProducts from './RecommendedProducts';
import { API_KEY, API_URL, REGION_ID } from '../../../constants';
import { getOrCreateCartId } from '../../../lib/cart';


const ProductPage = () => {

    const [product, setProduct] = useState([]);
    const { id } = useParams();

      useEffect(() => {
        const loadProduct = async () => {
          try {
            // Load product.
            const productRes = await fetch(`${API_URL}/store/products/${id}`, {
              headers: { "x-publishable-api-key": API_KEY },
            });
            const data = await productRes.json();
            const baseProduct = data.product || [];
            setProduct(baseProduct);
          } catch (err) {
            console.error("Failed to load product:", err);
          }
        };
    
        loadProduct();
      }, []);

      const addItemToCart = async (id_variant) => {
        try {
          const cartId = await getOrCreateCartId();
          await fetch(`${API_URL}/store/carts/${cartId}/line-items`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-publishable-api-key': API_KEY,
            },
            body: JSON.stringify({
              variant_id: id_variant,
              quantity: 1,
            }),
          });
      
          window.dispatchEvent(new Event("cartAmountUpdated"));

        } catch (err) {
          console.error('Failed to add product to cart:', err);
        }
      };
      
      

  return (
    <>
    <Navbar></Navbar>
    <VisualHeader text={`Products - ${product.title}`}/>

    <div className={`container py-5 ${styles.product_info_wrapper}`}>
        <div className={`row ${styles.product_info_container}`}>
            <div className="col-md-6">
                {/* <img src={product.thumbnail} className="img-fluid" alt="Product" /> */}
                <ProductImages images={product.images}></ProductImages>
            </div>
            <div className={`col-md-6 ${styles.product_info_text}`}>
                <h2>{product.title}</h2>
                <ProductPrice productId={id} regionId={REGION_ID}/>
                <h6 className={styles.subtitle}>{product.subtitle}</h6>

                <button className={styles.btn_default} onClick={() => addItemToCart(product.variants[0].id)}>ADD</button>
                {product.collection && (
                  <p>Collection: {product.collection.title}</p>
                )}
            </div>
        </div>
    </div>

    <div className={styles.description_wrapper}>
        <h4>DESCRIPTION</h4>
        <p className={styles.product_description}>{product.description}</p>
    </div>

    <RecommendedProducts product={product}></RecommendedProducts>

    <Footer></Footer>
    </>
  );
};

export default ProductPage;
