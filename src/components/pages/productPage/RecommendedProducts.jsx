import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './productPage.module.scss';
import ProductCard from '../../fragments/ProductCard';
import { API_KEY, API_URL, BESTSELLERS_ID } from '../../../constants';

const RecommendedProducts = ({product}) => {

  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const collectionId = product?.collection?.id;

  useEffect(() => {
    if (!collectionId || !product?.id) return;

    async function loadProducts() {
      try {
        // 1. Загрузка из коллекции текущего товара
        const res1 = await fetch(`${API_URL}/store/products?collection_id=${collectionId}`, {
          headers: { "x-publishable-api-key": API_KEY },
        });
        const data1 = await res1.json();
        console.log("res1.json():", data1); // <-- добавь это
        const collectionProducts = data1.products || [];

        // Фильтрация текущего товара
        let filtered = collectionProducts.filter(p => p.id !== product.id);
        console.log("filtered ", filtered);

        // 2. Если меньше 4 — добираем из "Бестселлеров"
        if (filtered.length < 4) {
          const needed = 4 - filtered.length;

          const res2 = await fetch(`${API_URL}/store/products?collection_id=${BESTSELLERS_ID}`, {
            headers: { "x-publishable-api-key": API_KEY },
          });
          const { products: bestsellers = [] } = await res2.json();

          const uniqueBestsellers = bestsellers
            .filter(p => p.id !== product.id && !filtered.some(fp => fp.id === p.id))
            .slice(0, needed); // только сколько нужно

          filtered = [...filtered, ...uniqueBestsellers];
        }

        setRecommendedProducts(filtered.slice(0, 4));
      } catch (err) {
        console.error("Ошибка при загрузке рекомендуемых товаров:", err);
      }
    }

    loadProducts();
  }, [collectionId, product?.id]);

  console.log(recommendedProducts);

    return (
        <div className={styles.recommended_products_wrapper}>
            <h5 className={styles.recommended_products_heading}>Рекомендуемые товары</h5>

            <div className={styles.recommended_products_container}>
                {recommendedProducts.map((product) => (

                <ProductCard product={product} key={product.id}></ProductCard>

                ))}
            </div>

        </div>
    );
  };
  
  export default RecommendedProducts;
  
