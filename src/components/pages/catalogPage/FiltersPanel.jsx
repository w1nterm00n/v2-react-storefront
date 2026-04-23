import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiSortAlt2 } from 'react-icons/bi';
import styles from './catalogPage.module.scss';
import { API_KEY, API_URL } from '../../../constants';

const FiltersPanel = ({ onSortMin, onSortMax, sortLabel }) => {
    const [categories, setCategories] = useState([]);
    const [collections, setCollections] = useState([]);

    const navigate = useNavigate();

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
          } catch (err) {
            console.error("Failed to load products:", err);
          } 
        };
        loadCollections();
      }, []);
    // Request collections.

    
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

    // Load products from the selected collection.
        async function loadCollection (collection) {
          try {
            const collectionProducts = await fetch(`${API_URL}/store/products?collection_id=${collection.id}`, {
              headers: { "x-publishable-api-key": API_KEY },
            });
            const data = await collectionProducts.json();
            const results = data.products || [];
            navigate('/products/search', { state: { results, collection} });
          } catch (err) {
            console.error("Failed to load collection products:", err);
          } 
        };
    // Load products from the selected collection.



    return (
        <nav className={styles.filters_panel_wrapper}>

          <Dropdown className={styles.dropdown_container}>
            <Dropdown.Toggle variant="none" className="d-flex align-items-center gap-2 text-dark" style={{border: "none"}}>
            <BiSortAlt2 />
            {sortLabel}
            </Dropdown.Toggle >

            <Dropdown.Menu className="bg-white shadow border">
              <Dropdown.Item onClick={onSortMin}>Price: low to high</Dropdown.Item>
              <Dropdown.Item onClick={onSortMax}>Price: high to low</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          {/* <div className="d-flex gap-3">

          {categories.map((category) => (
            <>
              <Dropdown>
              <Dropdown.Toggle variant="secondary" id={`dropdown-${category.id}`}>
                {category.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {category.category_children.map((child) => (
                  <Dropdown.Item
                    key={child.id}
                    onClick={() => loadCategory(child)}
                  >
                    {child.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
              </Dropdown>
            </>
            ))}

          {collections.map((collection) => (

          <div key={collection.id}>
            <button 
              className="btn btn-secondary" 
              type="button"
              aria-expanded="false">
              <a className="dropdown-item" href="#" onClick={() => loadCollection(collection)}>{collection.title}</a>
            </button>
          </div>

          ))}

          </div> */}
        </nav>
      );
};

export default FiltersPanel;
