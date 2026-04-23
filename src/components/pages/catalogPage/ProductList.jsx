import React, { useEffect, useState } from "react";
import Posts from "./Posts";
import Pagination from "../../fragments/Pagination";
import Footer from "../../fragments/Footer";
import FiltersPanel from "./FiltersPanel";
import Navbar from "../../fragments/Navbar";
import styles from './catalogPage.module.scss';
import Filtration from "./Filtration";
import VisualHeader from "../../fragments/VisualHeader";
import { API_URL, COUNTRY_CODE, API_KEY, REGION_ID } from "../../../constants";


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);
  const [sortLabel, setSortLabel] = useState("По умолчанию");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // 3. Получаем все товары
        const productsRes = await fetch(`${API_URL}/store/products?region_id=${REGION_ID}`, {
          headers: { "x-publishable-api-key": API_KEY },
        });
        const data = await productsRes.json();
        const baseProducts = data.products || [];
        baseProducts.forEach(p => {
          p.price_rub = p.variants[0].calculated_price.calculated_amount;
          p.price_rub = (p.price_rub / 100).toFixed(2);
        });
        setProducts(baseProducts);
        findMinAndMaxPrice(baseProducts);
      } catch (err) {
        console.error("Ошибка при загрузке продуктов:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
  //массив эл-тов, которые отобразятся на этой стр

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  //сортировка от минимума к максимуму
  const handleSortMin = () => {
    const sortedProducts = [...products].sort((a, b) => parseFloat(a.price_rub) - parseFloat(b.price_rub));
    setProducts(sortedProducts);
    setSortLabel("По возрастанию цены");
  };

  //сортировка от максимума к минимуму
  const handleSortMax = () => {
    const sortedProducts = [...products].sort((a, b) => parseFloat(b.price_rub) - parseFloat(a.price_rub));
    setProducts(sortedProducts);
    setSortLabel("По убыванию цены");
  };

  //поиск минимальной и максимальной цены
  const findMinAndMaxPrice = (products) => {
    if (products.length === 0) return;

    let min = parseFloat(products[0].price_rub);
    let max = parseFloat(products[0].price_rub);
  
    products.forEach(p => {
      if (parseFloat(p.price_rub) > max) max = p.price_rub;
      if (parseFloat(p.price_rub) < min) min = p.price_rub;
    });
  
    setMinPrice(min);
    setMaxPrice(max);
  }
  //поиск минимальной и максимальной цены

  return (
    <>
    <Navbar></Navbar>
    <VisualHeader text={"Товары"}></VisualHeader>
    <div style={{marginTop: '100px'}}>

      <FiltersPanel onSortMin={handleSortMin} onSortMax={handleSortMax} sortLabel={sortLabel}></FiltersPanel>

      <div className={styles.products_and_filtration}>
        <Filtration minPrice={minPrice} maxPrice={maxPrice} />
        <div style={{}}>
          <Posts products={currentPosts} loading={loading} />
        </div>
      </div>


      <Pagination length={products.length} postsPerPage={productsPerPage}
       handlePagination={handlePagination} currentPage={currentPage} />

    </div>

    <Footer></Footer>
    </>
  );
};

export default ProductList;
