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

    // запрос чтобы получить категории:
      useEffect(() => {
        const loadCategories = async () => {
          try {
            // 3. Получаем все категории
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
            console.error("Ошибка при загрузке продуктов:", err);
          } 
        };
        loadCategories();
      }, []);
    // запрос чтобы получить категории

    //функция получающая товары нужной категории:
    async function loadCategory (category) {
        try {
            //Получаю товары нужной категории
            const productsRes = await fetch(`${API_URL}/store/products?category_id=${category.id}`, {
            headers: { "x-publishable-api-key": API_KEY },
            });
            const data = await productsRes.json();
            const results = data.products || [];
            navigate('/products/search', { state: { results, category} });
        } catch (err) {
            console.error("Ошибка при загрузке продуктов:", err);
        }
    };
    //функция получающая товары нужной категории


    //при нажатии "Применить" - перемещающая на SearchedProducts
    async function findProductsByPrice() {
      try {
        //Получаем все товары
        const productsRes = await fetch(`${API_URL}/store/products?region_id=${REGION_ID}`, {
          headers: { "x-publishable-api-key": API_KEY },
        });
        const data = await productsRes.json();
        const baseProducts = data.products || [];
        baseProducts.forEach(p => {
          p.price_rub = p.variants[0].calculated_price.calculated_amount;
          p.price_rub = Number((p.price_rub / 100).toFixed(2));
        });

        //Фильтруем по baseProducts
        const results = baseProducts.filter(p => p.price_rub <= value);
        navigate('/products/search', { state: { results} });
      } catch (err) {
        console.error("Ошибка при загрузке продуктов:", err);
      }
    }
    
    //при нажатии "Применить" - перемещающая на SearchedProducts

    return (

    <div className={styles.filtration_wrapper}>
        <div className={styles.filtration}>
            <div className={styles.price_filter}>
                <h5>Фильтрация по цене</h5>
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
                    Цена: {Math.round(minPrice)}₽ - {value === 0 ? Math.round(maxPrice) : value}₽
                    </p>
                    <a href="#!"
                      onClick={e => {
                        e.preventDefault();
                        findProductsByPrice();
                      }}
                     className={styles.filter_apply_link}>
                    <i>Применить</i>
                    </a>
                </div>
            </div>
            
            <div className={styles.category_filter}>
                <h5>Категории</h5>
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