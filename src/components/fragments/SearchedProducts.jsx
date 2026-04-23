import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Footer from './Footer';
import Posts from '../pages/catalogPage/Posts';
import Navbar from './Navbar';
import VisualHeader from './VisualHeader';

const SearchedProducts = () => {

    const location = useLocation();
    const results = location.state?.results || [];
    const category = location.state?.category || null;
    const collection = location.state?.collection || null;

    console.log("collection 1: ", collection);
  return (
    <div className='content-wrapper d-flex flex-column min-vh-100'>

    <Navbar></Navbar>
    <div className='mainContent flex-grow-1'>

        {category ? (
          <>  
            <VisualHeader text={category.name} />
            <h2 style={{ textAlign: "center", padding: 20 }}>{category.name}</h2>
            <p style={{ textAlign: "center", padding: "0, 20" }} className="category-description">{category.description}</p>
          </>
        ) : collection ? ( 
          <>
            <VisualHeader text={collection.title} />
            <h2 style={{ textAlign: "center", padding: 20 }}>{collection.title}</h2>
          </>
        ) : (
          <VisualHeader text={"Результаты поиска"} />
        )}

        <div style={{width: 'fit-content', margin: '100px auto'}}>
        {results.length === 0 ? (
            <p style={{ textAlign: "center", padding: 20 }}>Ничего не найдено!</p>
        ) : (
          <Posts products={results} loading={false}/>
        )}
        </div>
    </div>
    
    <Footer></Footer>
    </div>
  );
};

export default SearchedProducts;
