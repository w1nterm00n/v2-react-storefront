import { useEffect, useState } from "react";
import Posts from "./Posts";
import Pagination from "../../fragments/Pagination";
import Footer from "../../fragments/Footer";
import FiltersPanel from "./FiltersPanel";
import Navbar from "../../fragments/Navbar";
import styles from './catalogPage.module.scss';
import Filtration from "./Filtration";
import VisualHeader from "../../fragments/VisualHeader";
import { API_URL, API_KEY, REGION_ID } from "../../../constants";


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const [sortLabel, setSortLabel] = useState("Default");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Load all products.
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
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
  // Products displayed on the current page.

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  // Sort from lowest to highest price.
  const handleSortMin = () => {
    const sortedProducts = [...products].sort((a, b) => parseFloat(a.price_rub) - parseFloat(b.price_rub));
    setProducts(sortedProducts);
    setSortLabel("Price: low to high");
  };

  // Sort from highest to lowest price.
  const handleSortMax = () => {
    const sortedProducts = [...products].sort((a, b) => parseFloat(b.price_rub) - parseFloat(a.price_rub));
    setProducts(sortedProducts);
    setSortLabel("Price: high to low");
  };

  // Find the minimum and maximum price.
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
  // Find the minimum and maximum price.

  return (
    <>
    <Navbar></Navbar>
    <VisualHeader text={"Products"}></VisualHeader>
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
