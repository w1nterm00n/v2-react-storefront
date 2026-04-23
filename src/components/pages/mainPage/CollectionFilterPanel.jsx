import React, { useEffect, useState } from 'react';
import styles from './mainPage.module.scss';
import ProductCard from '../../fragments/ProductCard';
import { API_KEY, API_URL } from '../../../constants';

const CollectionFilterPanel = () => {
    const [collections, setCollections] = useState([]);
    const [chosenCollection, setChosenCollection] = useState(null);
    const [actualProducts, setActualProducts] = useState([]);

    // Request collections.
    useEffect(() => {
        const loadCollections = async () => {
          try {
            // Load all collections.
            const collectionsRes = await fetch(`${API_URL}/store/collections`, {
              headers: { "x-publishable-api-key": API_KEY },
            });
            const data = await collectionsRes.json();
            setCollections(data.collections);
            if (data.collections.length > 0) {
                setChosenCollection(data.collections[0]); // Use the first collection as the default.
                loadCollectionProducts(data.collections[0]); // Load its products.
              }
          } catch (err) {
            console.error("Failed to load products:", err);
          } 
        };
        loadCollections();
      }, []);
    // Request collections.

    // Load products from the selected collection.
    async function loadCollectionProducts (collection) {
        try {
          const collectionProducts = await fetch(`${API_URL}/store/products?collection_id=${collection.id}`, {
            headers: { "x-publishable-api-key": API_KEY },
          });
          const data = await collectionProducts.json();
          const results = data.products || [];
          setActualProducts(results.slice(0, 4));
        } catch (err) {
          console.error("Failed to load collection products:", err);
        } 
      };
  // Load products from the selected collection.


    // Handle collection clicks.
    const handleCollectionClick = (collection) => {
        setChosenCollection(collection);
        loadCollectionProducts(collection);  
    };


  return (
    <div className={styles.collection_and_products_wrapper}>
        <div className={styles.collection_filter_wrapper}>
            {collections.map((collection) => (
            <div
            key={collection.id}
            className={`${styles.collection_filter_item} ${
                chosenCollection?.id === collection.id ? styles.chosen_collection : ''
            }`}
            onClick={() => handleCollectionClick(collection)}
            >
            <a href="#!">{collection.title}</a>
            </div>
        ))}
        </div>
                
        <div className={styles.grid_cards_wrapper}>
            <div className={styles.grid_cards}>
                {actualProducts.map((actualProduct) => (
                    <ProductCard product={actualProduct}></ProductCard>
                ))}
            </div>
        </div>
    </div>
  );
};

export default CollectionFilterPanel;
