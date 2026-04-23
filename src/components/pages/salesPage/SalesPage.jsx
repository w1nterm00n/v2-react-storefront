import { useEffect, useState } from "react";
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
  const productsPerPage = 9;

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
            console.error("Failed to load sale products:", err);
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



  return (
    <>
    <Navbar></Navbar>
    <VisualHeader text={"Sale Products"}></VisualHeader>
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
