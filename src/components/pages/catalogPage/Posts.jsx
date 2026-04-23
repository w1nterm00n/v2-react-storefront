import React from 'react';
import ProductCard from '../../fragments/ProductCard';
import styles from './catalogPage.module.scss';

const Posts = ({ products, loading }) => {
  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (

    <div className={styles.gridCards}>
    {products.map((product) => (
      <ProductCard product={product} />
    ))}
  </div>
  );
};

export default Posts;