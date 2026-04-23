import React, { useEffect, useState } from 'react';
import MainPageSlider from './MainPageSlider';
import styles from './mainPage.module.scss';
import FeaturedProducts from './FeaturedProducts';
import Navbar from '../../fragments/Navbar';
import WhyChooseUs from './WhyChooseUs';
import Footer from '../../fragments/Footer';
import CustomersReview from './CustomersReview';

const MainPage = () => {
    
  return (
    <>
        <Navbar></Navbar>
        <MainPageSlider></MainPageSlider>
        <FeaturedProducts></FeaturedProducts>
        <WhyChooseUs></WhyChooseUs>
        <CustomersReview></CustomersReview>
        <Footer></Footer>
    </>
  );
};

export default MainPage;
