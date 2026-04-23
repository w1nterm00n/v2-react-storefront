import React, { useState, useEffect } from 'react';
import ProductCard from '../../fragments/ProductCard';
import styles from './catalogPage.module.scss';
import { API_KEY, API_URL, REGION_ID } from '../../../constants';
import { useNavigate } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
const Filtration = ({minPrice, maxPrice}) => {

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [value, setValue] = useState(0);  //slider

    // Request categories.
      useEffect(() => {
        const loadCategories = async () => {
          try {
            // Load all categories.
            const categoriesRes = await fetch(`${API_URL}/store/product-categories`, {
              headers: { "x-publishable-api-key": API_KEY },
            });
            const data = await categoriesRes.json();
            const allCategories = data.product_categories || [];
            let parentCategories = [];
            allCategories.forEach(c => {
                if (c.category_children.length > 0) {
                    parentCategories.push(c);
                }
            });
            setCategories(parentCategories);

          } catch (err) {
            console.error("Failed to load products:", err);
          } 
        };
        loadCategories();
      }, []);
    // Request categories.

    // Load products from the selected category.
    async function loadCategory (category) {
        try {
            // Load products from the selected category.
            const productsRes = await fetch(`${API_URL}/store/products?category_id=${category.id}`, {
            headers: { "x-publishable-api-key": API_KEY },
            });
            const data = await productsRes.json();
            const results = data.products || [];
            navigate('/products/search', { state: { results, category} });
        } catch (err) {
            console.error("Failed to load products:", err);
        }
    };
    // Load products from the selected category.


    // Move to SearchedProducts when Apply is clicked.
    async function findProductsByPrice() {
      try {
        // Load all products.
        const productsRes = await fetch(`${API_URL}/store/products?region_id=${REGION_ID}`, {
          headers: { "x-publishable-api-key": API_KEY },
        });
        const data = await productsRes.json();
        const baseProducts = data.products || [];
        baseProducts.forEach(p => {
          p.price_rub = p.variants[0].calculated_price.calculated_amount;
          p.price_rub = Number((p.price_rub / 100).toFixed(2));
        });

        // Filter baseProducts.
        const results = baseProducts.filter(p => p.price_rub <= value);
        navigate('/products/search', { state: { results} });
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    }
    
    // Move to SearchedProducts when Apply is clicked.

    return (

    <div className={styles.filtration_wrapper}>
        <div className={styles.filtration}>
            <div className={styles.price_filter}>
                <h5>Filter by Price</h5>
                <div className={styles.filtration_line}>
                    <div className={styles.vertical_line}></div>
                    <Slider
                        min={Math.round(minPrice)}
                        max={Math.round(maxPrice)}
                        value={value}
                        onChange={(v) => setValue(v)}
                        styles={{
                          track: { backgroundColor: "#8CBC4F", height: 2 },
                          rail: { backgroundColor: "#e0e0e0", height: 2 },
                          handle: {
                            border: 0,
                            backgroundColor: "#3a4f21",
                            width: 1,
                            height: 24,
                            marginTop: -9,
                            boxShadow: "0 2px 8px rgba(133, 187, 101, 0.12)"
                          }
                        }}
                      />
                    <div className={styles.vertical_line}></div>
                </div>
          
                <div className={styles.filter_apply_section}>
                    <p>
                    Price: {Math.round(minPrice)} RUB - {value === 0 ? Math.round(maxPrice) : value} RUB
                    </p>
                    <a href="#!"
                      onClick={e => {
                        e.preventDefault();
                        findProductsByPrice();
                      }}
                     className={styles.filter_apply_link}>
                    <i>Apply</i>
                    </a>
                </div>
            </div>
            
            <div className={styles.category_filter}>
                <h5>Categories</h5>
                {categories.map((category) => (
                <div className={styles.filtration_categories} key={category.id}>
                    <p>{category.name}</p>
                    <div className={styles.categories_child}>

                        {category.category_children.map((child) => (
                        <a key={child.id} className="dropdown-item" href="#" onClick={() => loadCategory(child)}>{child.name}</a>
                        ))}

                    </div>
                </div>
                ))}
            </div>
        </div>
    </div>

  );
};

export default Filtration;
