import React, { useEffect, useState } from "react";
import Pagination from "../../fragments/Pagination";
import Footer from "../../fragments/Footer";
import Navbar from "../../fragments/Navbar";
import VisualHeader from "../../fragments/VisualHeader";
import Posts from "../catalogPage/Posts";
import { API_KEY, API_URL, SALES_COLLECTION_ID } from "../../../constants";


const SalesPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);

  useEffect(() => {
    const loadProducts = async () => {
        try {
            const collectionProducts = await fetch(`${API_URL}/store/products?collection_id=${SALES_COLLECTION_ID}`, {
              headers: { "x-publishable-api-key": API_KEY },
            });
            const data = await collectionProducts.json();
            const results = data.products || [];
            setProducts(results);
          } catch (err) {
            console.error("Ошибка при загрузке продуктов по акции:", err);
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



  return (
    <>
    <Navbar></Navbar>
    <VisualHeader text={"Товары по акции"}></VisualHeader>
    <div style={{marginTop: '100px'}}>

      <div style={{margin: '0 auto', width: 'fit-content'}}>
        <Posts products={currentPosts} loading={loading} />
      </div>


      <Pagination length={products.length} postsPerPage={productsPerPage}
       handlePagination={handlePagination} currentPage={currentPage} />

    </div>

    <Footer></Footer>
    </>
  );
};

export default SalesPage;
